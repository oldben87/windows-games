import {Flex, Icon, Text} from "@chakra-ui/react"
import {unhideSquares} from "../helpers/unhideSquares"
import {GameSquare, GameState, GameVariables} from "../types"
import useLongPress from "hooks/useLongPress"
import {updateSquare} from "../helpers/unhideSquares"
import {CgFlagAlt} from "react-icons/cg"
import {GiMineExplosion, GiUnlitBomb} from "react-icons/gi"

const getFontColor = (square: GameSquare) => {
  if (square.hasFlag) {
    return "black"
  }

  switch (square.value) {
    case 1:
    case 5:
      return "blue"
    case 2:
    case 6:
      return "green"
    case 3:
    case 7:
      return "red"
    case 4:
    case 8:
      return "purple"
    default:
      return "black"
  }
}

const getSquareBgColor = (square: GameSquare, gameVariables: GameVariables) => {
  if (
    (gameVariables.hasLost || gameVariables.hasWon) &&
    square.hasFlag &&
    square.isMine
  ) {
    return "primaryGreen"
  }

  if (
    (gameVariables.hasLost && square.hasFlag && !square.isMine) ||
    (gameVariables.hasLost && !square.hasFlag && square.isMine) ||
    (!square.isHidden && square.isMine)
  ) {
    return "red"
  }

  return "none"
}

const getSquareStyle = (square: GameSquare, gameVariables: GameVariables) => {
  const MineSquareHidden = {
    borderWidth: "2px",
    borderLeftColor: "snow",
    borderBottomColor: "black",
    borderTopColor: "snow",
    borderRightColor: "black",
  }

  const MineSquareEmpty = {
    borderWidth: "1px",
    borderColor: "black",
    borderStyle: "dashed",
  }

  const squareBorder = square.isHidden ? MineSquareHidden : MineSquareEmpty
  const bgColor = getSquareBgColor(square, gameVariables)

  return {
    ...squareBorder,
    bgColor,
  }
}

const getSquareValue = (
  square: GameSquare,
  gameVariables: GameVariables,
): React.ReactNode => {
  if (square.isHidden && square.hasFlag) {
    return <Icon as={CgFlagAlt} height="70%" width="70%" />
  }

  if (square.isMine && !square.isHidden) {
    return <Icon as={GiMineExplosion} height="70%" width="70%" />
  }

  if (square.isMine && gameVariables.hasLost) {
    return <Icon as={GiUnlitBomb} height="70%" width="70%" />
  }

  if (square.isHidden) {
    return null
  }

  return (
    <Text fontWeight={700} color={getFontColor(square)}>
      {square.value === 0 ? null : square.value}
    </Text>
  )
}

export const MineSquare = ({
  mineSquare,
  gameState,
  setGameState,
  gameVariables,
}: {
  mineSquare: GameSquare
  gameState: GameState
  setGameState: (state: GameState) => void
  gameVariables: GameVariables
}) => {
  const onLongPress = () => {
    if (gameVariables.hasWon || gameVariables.hasLost) {
      return
    }

    if (!mineSquare.hasFlag) {
      setGameState(updateSquare(gameState, mineSquare, "hasFlag", true))
    } else {
      setGameState(updateSquare(gameState, mineSquare, "hasFlag", false))
    }
  }

  const onClick = () => {
    if (gameVariables.hasWon || gameVariables.hasLost) {
      return
    }

    if (mineSquare.hasFlag && mineSquare.isHidden) {
      setGameState(updateSquare(gameState, mineSquare, "hasFlag", false))
      return
    }

    if (mineSquare.isHidden) {
      const newState = unhideSquares(
        gameState,
        mineSquare.xCoOrd,
        mineSquare.yCoOrd,
      )

      setGameState(newState)

      return
    }

    return
  }

  const defaultOptions = {
    shouldPreventDefault: true,
    delay: 300,
  }

  const longEventPress = useLongPress({onLongPress, onClick}, defaultOptions)

  return (
    <Flex
      h={8}
      w={8}
      {...getSquareStyle(mineSquare, gameVariables)}
      justify="center"
      alignItems="center"
      {...longEventPress}
    >
      {getSquareValue(mineSquare, gameVariables)}
    </Flex>
  )
}
