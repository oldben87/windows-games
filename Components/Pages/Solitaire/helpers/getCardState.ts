import {getCardValue} from "..//helpers/getCardsForGame"
import {CardInfo, CardState, CardPile} from "../types"

export const getCardState = (shuffledDeck: CardPile): CardState => {
  return shuffledDeck.reduce<{[key: string]: CardInfo}>(
    (acc: CardState, index: number) => {
      return {...acc, [index.toString()]: getCardValue(index)}
    },
    {},
  )
}
