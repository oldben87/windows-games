import {getCardValue} from "components/pages/Solitaire/helpers/getCardsForGame"
import {CardInfo, CardState, CardPile} from "components/pages/Solitaire/types"

export const getCardState = (shuffledDeck: CardPile): CardState => {
  return shuffledDeck.reduce<{[key: string]: CardInfo}>(
    (acc: CardState, index: number) => {
      return {...acc, [index.toString()]: getCardValue(index)}
    },
    {},
  )
}
