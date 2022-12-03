import {GameSquare, GameState} from "../types"
import {getRandomNumber} from "./getRandomNumber"

export const createGameState = (
  rows: number,
  columns: number,
  mines: number,
): GameState => {
  const board = []

  const mineList: Array<number> = []

  for (let m = 0; m < mines; m++) {
    const number = getRandomNumber(mineList, rows * columns)
    mineList.push(number)
  }

  let mineCounter = 1

  for (let i = 0; i < rows; i++) {
    const row: Array<GameSquare> = []
    for (let j = 0; j < columns; j++) {
      const isMine = mineList.includes(mineCounter)

      row.push({
        isMine,
        hasFlag: false,
        value: null,
        xCoOrd: j,
        yCoOrd: i,
        isHidden: true,
      })
      mineCounter++
    }
    board.push(row)
  }

  const result = []

  for (let i2 = 0; i2 < rows; i2++) {
    const row2: Array<GameSquare> = []
    for (let j2 = 0; j2 < columns; j2++) {
      row2.push({...board[i2][j2], value: getSquareValue(board, i2, j2)})
    }
    result.push(row2)
  }

  return result
}

function getSquareValue(board: GameState, x: number, y: number): number | null {
  let mineCount = 0

  if (board[x][y].isMine === true) {
    return null
  }

  if (
    board[x - 1] != undefined &&
    board[x - 1][y - 1] != undefined &&
    board[x - 1][y - 1].isMine
  ) {
    mineCount++
  }

  if (
    board[x - 1] != undefined &&
    board[x - 1][y] != undefined &&
    board[x - 1][y].isMine
  ) {
    mineCount++
  }

  if (
    board[x - 1] != undefined &&
    board[x - 1][y + 1] != undefined &&
    board[x - 1][y + 1].isMine
  ) {
    mineCount++
  }

  if (board[x][y - 1] != undefined && board[x][y - 1].isMine) {
    mineCount++
  }

  if (board[x][y + 1] != undefined && board[x][y + 1].isMine) {
    mineCount++
  }

  if (
    board[x + 1] != undefined &&
    board[x + 1][y - 1] != undefined &&
    board[x + 1][y - 1].isMine
  ) {
    mineCount++
  }

  if (
    board[x + 1] != undefined &&
    board[x + 1][y] != undefined &&
    board[x + 1][y].isMine
  ) {
    mineCount++
  }

  if (
    board[x + 1] != undefined &&
    board[x + 1][y + 1] != undefined &&
    board[x + 1][y + 1].isMine
  ) {
    mineCount++
  }

  return mineCount
}
