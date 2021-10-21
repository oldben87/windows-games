import {Flex, Text} from "@chakra-ui/react"
import {unhideSquares} from "../helpers/unhideSquares"
import {GameSquare, GameState} from "../types"
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

export const MineSquare = ({
  mineSquare,
  gameState,
  setGameState,
}: {
  mineSquare: GameSquare
  gameState: GameState
  setGameState: (state: GameState) => void
}) => {
  const MineSquareHidden = {
    borderWidth: "2px",
    borderColorLeft: "snow",
    borderBottomColor: "black",
    borderColorTop: "snow",
    borderRightColor: "black",
  }

  const MineSquareEmpty = {
    borderWidth: "1px",
    borderColor: "black",
    borderStyle: "dashed",
  }

  const squareBorder = mineSquare.isHidden ? MineSquareHidden : MineSquareEmpty

  const onLongPress = () => {
    if (!mineSquare.hasFlag) {
      setGameState(updateSquare(gameState, mineSquare, "hasFlag", true))
    } else {
      setGameState(updateSquare(gameState, mineSquare, "hasFlag", false))
    }
  }

  const onClick = () => {
    const newState = unhideSquares(
      gameState,
      mineSquare.xCoOrd,
      mineSquare.yCoOrd,
    )

    setGameState(newState)
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
      {...squareBorder}
      bgColor={!mineSquare.isHidden && mineSquare.isMine ? "red" : "none"}
      justify="center"
      alignItems="center"
      {...longEventPress}
    >
      <Text fontWeight={700} color={getFontColor(mineSquare)}>
        {mineSquare.isHidden && mineSquare.hasFlag
          ? "F"
          : mineSquare.isHidden
          ? null
          : mineSquare.isMine
          ? "M"
          : mineSquare.value}
      </Text>
    </Flex>
  )
}
