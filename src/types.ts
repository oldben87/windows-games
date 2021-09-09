export interface CardInfo {
  id: number
  value: number
  suit: SuitEnum
  isRed: boolean
  currentPile?: string
  visible?: boolean
}

export enum SuitEnum {
  spades = 'spades',
  clubs = 'clubs',
  hearts = 'hearts',
  diamonds = 'diamonds',
}

export interface CardProps {
  card: CardInfo
  isFirst?: boolean
  faceUp?: boolean
  selectedId: string | null
  onClick: () => void
  gameState?: GameState | null
  setGameState?: (gameState: GameState) => void
}

export type CardPile = Array<number>

export interface GameState {
  [key: string]: CardPile
}

export interface CardState {
  [key: string]: CardInfo
}
