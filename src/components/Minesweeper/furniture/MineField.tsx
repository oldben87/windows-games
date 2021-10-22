import {Flex} from "@chakra-ui/react"
import {GameState, GameVariables} from "../types"
import {MineRow} from "./MineRow"

export const MineField = ({
  gameState,
  setGameState,
  gameVariables,
}: {
  gameState: GameState
  setGameState: (state: GameState) => void
  gameVariables: GameVariables
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
            gameVariables={gameVariables}
          />
        )
      })}
    </Flex>
  )
}
