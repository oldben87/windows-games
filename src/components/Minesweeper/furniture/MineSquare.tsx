import {Flex, Text} from "@chakra-ui/react"
import {unhideSquares} from "../helpers/unhideSquares"
import {GameSquare, GameState} from "../types"

const getFontColor = (value: number | null) => {
  switch (value) {
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

  return (
    <Flex
      h={8}
      w={8}
      {...squareBorder}
      justify="center"
      alignItems="center"
      onClick={() => {
        const newState = unhideSquares(
          gameState,
          mineSquare.xCoOrd,
          mineSquare.yCoOrd,
        )

        setGameState(newState)
      }}
    >
      <Text fontWeight={700} color={getFontColor(mineSquare.value)}>
        {mineSquare.hasFlag
          ? "F"
          : mineSquare.isHidden
          ? null
          : mineSquare.value}
      </Text>
    </Flex>
  )
}
