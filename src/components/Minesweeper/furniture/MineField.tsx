import {Flex} from "@chakra-ui/react"
import {GameState} from "../types"
import {MineRow} from "./MineRow"

export const MineField = ({
  gameState,
  setGameState,
}: {
  gameState: GameState
  setGameState: (state: GameState) => void
}) => {
  return (
    <Flex m={2}>
      {gameState.map((row, i) => {
        return (
          <MineRow
            gameRow={row}
            key={i.toString()}
            gameState={gameState}
            setGameState={setGameState}
          />
        )
      })}
    </Flex>
  )
}
