import {useState, useEffect} from "react"
import {GameState, GameVariables} from "./types"
import {createGameState} from "./helpers/createGameState"
import {GameHeader, Background, MineField} from "./furniture"
import {useDisclosure} from "@chakra-ui/hooks"
import {NewGameModal} from "./furniture/NewGameModal"
import {getMaxMines} from "./helpers/getMaxMines"

const initialVariables: GameVariables = {
  flagsRemaining: 0,
  mineCount: 0,
  gameXCount: 10,
  gameYCount: 10,
  hasWon: false,
  hasLost: false,
}

export default function MinesweeperGameBord() {
  const [gameVariables, setGameVariables] = useState<GameVariables>({
    ...initialVariables,
  })
  const [gameState, setGameState] = useState(createGameState(10, 10, 0))

  const {isOpen, onOpen, onClose} = useDisclosure()

  useEffect(() => {
    const newGameVariables = getGameVariables(gameState, gameVariables)

    setGameVariables(newGameVariables)

    if (gameVariables.mineCount === 0) {
      onOpen()
    }
  }, [gameState, gameVariables, onOpen])

  const maxMines = getMaxMines(gameVariables)

  return (
    <Background>
      <GameHeader
        gameVariables={gameVariables}
        openNewGameModal={() => {
          onOpen()
        }}
      />
      <MineField
        gameState={gameState}
        setGameState={(newState: GameState) => {
          setGameState(newState)
        }}
        gameVariables={gameVariables}
      />
      <NewGameModal
        isOpen={isOpen}
        onClose={onClose}
        gameVariables={gameVariables}
        setGameVariables={setGameVariables}
        onGameStart={() => {
          if (
            gameVariables.mineCount === 0 ||
            gameVariables.gameYCount < 2 ||
            gameVariables.gameXCount < 2
          ) {
            return
          }

          if (gameVariables.mineCount > maxMines) {
            return
          }

          setGameState(
            createGameState(
              gameVariables.gameYCount,
              gameVariables.gameXCount,
              gameVariables.mineCount,
            ),
          )
          onClose()
        }}
        maxMines={maxMines}
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
