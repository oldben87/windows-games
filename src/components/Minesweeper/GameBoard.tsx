import {useState, useEffect} from "react"
import {GameState, GameVariables} from "./types"
import {createGameState} from "./helpers/createGameState"
import {GameHeader, Background, MineField} from "./furniture"

const initialVariables: GameVariables = {
  flagsRemaining: 0,
  mineCount: 0,
  gameXCount: 0,
  gameYCount: 0,
  hasWon: false,
  hasLost: false,
}

export default function () {
  const mineCount = 5
  const [gameState, setGameState] = useState(createGameState(5, 5, mineCount))
  const [gameVariables, setGameVariables] = useState<GameVariables>({
    ...initialVariables,
    mineCount,
  })

  useEffect(() => {
    const newGameVariables = getGameVariables(gameState, gameVariables)

    setGameVariables(newGameVariables)
  }, [gameState])

  return (
    <Background>
      <GameHeader gameVariables={gameVariables} />
      <MineField
        gameState={gameState}
        setGameState={(newState: GameState) => {
          setGameState(newState)
        }}
        gameVariables={gameVariables}
      />
    </Background>
  )
}

const getGameVariables = (
  gameState: GameState,
  gameVariables: GameVariables,
) => {
  let flagsPlaced = 0
  let flagsCorrectlyPlaced = 0
  let hasLost = false
  for (let row of gameState) {
    for (let square of row) {
      if (square.isHidden && square.hasFlag) {
        flagsPlaced++
      }

      if (square.isHidden && square.hasFlag && square.isMine) {
        flagsCorrectlyPlaced++
      }

      if (!square.isHidden && square.isMine) {
        hasLost = true
      }
    }
  }

  const hasWon = flagsCorrectlyPlaced === gameVariables.mineCount

  return {
    ...gameVariables,
    flagsRemaining: gameVariables.mineCount - flagsPlaced,
    hasLost,
    hasWon,
  }
}
