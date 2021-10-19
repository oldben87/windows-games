import {update} from "ramda"
import {GameState, GameSquare} from "../types"

const unhideSquare = (gameState: GameState, square: GameSquare) => {
  const newSquare = {...square, isHidden: false}
  const newRow = update(square.xCoOrd, newSquare, gameState[square.yCoOrd])

  return update(square.yCoOrd, newRow, gameState)
}

export const unhideSquares = (
  gameState: GameState,
  xCoOrd: number,
  yCoOrd: number,
): GameState => {
  if (
    gameState[yCoOrd] == undefined ||
    gameState[yCoOrd][xCoOrd] == undefined ||
    gameState[yCoOrd][xCoOrd].isHidden === false
  ) {
    return gameState
  }

  if (gameState[yCoOrd][xCoOrd].value !== 0) {
    return unhideSquare(gameState, gameState[yCoOrd][xCoOrd])
  }

  const unhidden = unhideSquare(gameState, gameState[yCoOrd][xCoOrd])

  const newStateLeft = unhideSquares(unhidden, xCoOrd - 1, yCoOrd)
  const newStateRight = unhideSquares(newStateLeft, xCoOrd + 1, yCoOrd)
  const newStateUp = unhideSquares(newStateRight, xCoOrd, yCoOrd - 1)
  const newStateDown = unhideSquares(newStateUp, xCoOrd, yCoOrd + 1)
  const northWest = unhideSquares(newStateDown, xCoOrd - 1, yCoOrd + 1)
  const northEast = unhideSquares(northWest, xCoOrd + 1, yCoOrd + 1)
  const southWest = unhideSquares(northEast, xCoOrd - 1, yCoOrd - 1)
  const soutEast = unhideSquares(southWest, xCoOrd + 1, yCoOrd - 1)

  return soutEast
}
