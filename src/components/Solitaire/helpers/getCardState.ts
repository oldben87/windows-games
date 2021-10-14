import { getCardValue } from 'components/Solitaire/helpers/getCardsForGame'
import { CardInfo, CardState, CardPile } from 'components/Solitaire/types'

export const getCardState = (shuffledDeck: CardPile): CardState => {
  return shuffledDeck.reduce<{ [key: string]: CardInfo }>(
    (acc: CardState, index: number) => {
      return { ...acc, [index.toString()]: getCardValue(index) }
    },
    {},
  )
}
