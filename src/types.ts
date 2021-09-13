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
  position: SelectedCardPositionEnum | null
  selectedId: string | null
  onClick: () => void
  faceUp?: boolean
  isFirst?: boolean
  gameState?: GameState | null
  setGameState?: (gameState: GameState) => void
  fixPosition?: boolean
}

export type CardPile = Array<number>

export interface GameState {
  [key: string]: CardPile
}

export interface CardState {
  [key: string]: CardInfo
}

export enum SelectedCardPositionEnum {
  top = 'top',
  bottom = 'bottom',
  middle = 'middle',
  singleCard = 'singleCard',
}
