export interface GameSquare {
  isMine: boolean
  hasFlag: boolean
  value: number | null
  xCoOrd: number
  yCoOrd: number
  isHidden: boolean
}

export type GameState = Array<Array<GameSquare>>
