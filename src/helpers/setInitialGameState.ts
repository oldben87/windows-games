import { CardPile, GameState } from 'types'
import { remove } from 'ramda'

export const setInitialGameState = (shuffledDeck: CardPile): GameState => ({
  gameColumn1: [shuffledDeck[0]],
  gameColumn2: [shuffledDeck[1], shuffledDeck[8]],
  gameColumn3: [shuffledDeck[2], shuffledDeck[9], shuffledDeck[15]],
  gameColumn4: [
    shuffledDeck[3],
    shuffledDeck[10],
    shuffledDeck[16],
    shuffledDeck[21],
  ],
  gameColumn5: [
    shuffledDeck[4],
    shuffledDeck[11],
    shuffledDeck[17],
    shuffledDeck[22],
    shuffledDeck[26],
  ],
  gameColumn6: [
    shuffledDeck[5],
    shuffledDeck[12],
    shuffledDeck[18],
    shuffledDeck[23],
    shuffledDeck[27],
    shuffledDeck[30],
  ],
  gameColumn7: [
    shuffledDeck[6],
    shuffledDeck[13],
    shuffledDeck[19],
    shuffledDeck[24],
    shuffledDeck[28],
    shuffledDeck[31],
    shuffledDeck[33],
  ],
  gameColumn8: [
    shuffledDeck[7],
    shuffledDeck[14],
    shuffledDeck[20],
    shuffledDeck[25],
    shuffledDeck[29],
    shuffledDeck[32],
    shuffledDeck[34],
    shuffledDeck[35],
  ],
  sparePileHidden: remove(0, 35, shuffledDeck),
  sparePileShowing: [],
  suitPile1: [],
  suitPile2: [],
  suitPile3: [],
  suitPile4: [],
})
