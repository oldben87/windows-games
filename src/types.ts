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
}

export type CardPile = Array<CardInfo>

export interface GameState {
  gameColumn1: CardPile
  gameColumn2: CardPile
  gameColumn3: CardPile
  gameColumn4: CardPile
  gameColumn5: CardPile
  gameColumn6: CardPile
  gameColumn7: CardPile
  gameColumn8: CardPile
  sparePileHidden: CardPile
  sparePileShowing: CardPile
  suitPile1: CardPile
  suitPile2: CardPile
  suitPile3: CardPile
  suitPile4: CardPile
}
