import {Flex} from "@chakra-ui/react"
import {GameSquare, GameState, GameVariables} from "../types"
import {MineSquare} from "./MineSquare"

export const MineRow = ({
  gameRow,
  gameState,
  setGameState,
  gameVariables,
}: {
  gameRow: Array<GameSquare>
  gameState: GameState
  setGameState: (state: GameState) => void
  gameVariables: GameVariables
}) => {
  return (
    <Flex direction="row">
      {gameRow.map((square) => (
        <MineSquare
          mineSquare={square}
          key={`${square.xCoOrd}-${square.yCoOrd}`}
          gameState={gameState}
          setGameState={setGameState}
          gameVariables={gameVariables}
        />
      ))}
    </Flex>
  )
}
