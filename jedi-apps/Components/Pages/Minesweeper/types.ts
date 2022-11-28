export interface GameSquare {
  isMine: boolean
  hasFlag: boolean
  value: number | null
  xCoOrd: number
  yCoOrd: number
  isHidden: boolean
}

export type GameState = Array<Array<GameSquare>>

export interface GameVariables {
  flagsRemaining: number
  mineCount: number
  gameXCount: number
  gameYCount: number
  hasWon: boolean
  hasLost: boolean
}
