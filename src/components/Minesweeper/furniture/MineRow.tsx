import {Flex} from "@chakra-ui/react"
import {GameSquare, GameState} from "../types"
import {MineSquare} from "./MineSquare"

export const MineRow = ({
  gameRow,
  gameState,
  setGameState,
}: {
  gameRow: Array<GameSquare>
  gameState: GameState
  setGameState: (state: GameState) => void
}) => {
  return (
    <Flex direction="column">
      {gameRow.map((square) => (
        <MineSquare
          mineSquare={square}
          key={`${square.xCoOrd}-${square.yCoOrd}`}
          gameState={gameState}
          setGameState={setGameState}
        />
      ))}
    </Flex>
  )
}
