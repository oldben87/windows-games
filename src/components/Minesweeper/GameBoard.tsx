import {useState} from "react"
import {GameState} from "./types"
import {createGameState} from "./helpers/createGameState"
import {GameHeader, Background, MineField} from "./furniture"

export default function () {
  const mineCount = 1
  const [gameState, setGameState] = useState(createGameState(5, 5, mineCount))

  return (
    <Background>
      <GameHeader mineCount={mineCount} />
      <MineField
        gameState={gameState}
        setGameState={(newState: GameState) => {
          setGameState(newState)
        }}
      />
    </Background>
  )
}
