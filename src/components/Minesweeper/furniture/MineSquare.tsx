import {Flex, Text} from "@chakra-ui/react"
import {unhideSquares} from "../helpers/unhideSquares"
import {GameSquare, GameState, GameVariables} from "../types"
import useLongPress from "hooks/useLongPress"
import {updateSquare} from "../helpers/unhideSquares"

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
  const bgColor =
    (gameVariables.hasLost || gameVariables.hasWon) &&
    square.hasFlag &&
    square.isMine
      ? "green"
      : gameVariables.hasLost && square.hasFlag && !square.isMine
      ? "red"
      : gameVariables.hasLost && !square.hasFlag && square.isMine
      ? "red"
      : !square.isHidden && square.isMine
      ? "red"
      : "none"

  return {
    ...squareBorder,
    bgColor,
  }
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
      <Text fontWeight={700} color={getFontColor(mineSquare)}>
        {mineSquare.isHidden && mineSquare.hasFlag
          ? "F"
          : mineSquare.isMine && gameVariables.hasLost
          ? "M"
          : mineSquare.isHidden
          ? null
          : mineSquare.isMine
          ? "M"
          : mineSquare.value}
      </Text>
    </Flex>
  )
}
