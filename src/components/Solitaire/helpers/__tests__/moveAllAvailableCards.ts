import { expect } from 'chai'
import { getShuffledDeck, getCardState, moveAllAvailableCards } from '..'

const cardState = getCardState(getShuffledDeck())
const gameState = {
  gameColumn1: [],
  gameColumn2: [],
  gameColumn3: [],
  gameColumn4: [],
  gameColumn5: [],
  gameColumn6: [],
  gameColumn7: [],
  gameColumn8: [],
  sparePileHidden: [],
  sparePileShowing: [],
  suitPile1: [],
  suitPile2: [],
  suitPile3: [],
  suitPile4: [],
}

describe('moveAllAvailableCards', () => {
  context('when there are 3 cards to move to the suit pile', () => {
    it('should move the cards to the correct suit piles', () => {
      expect(
        moveAllAvailableCards(
          {
            ...gameState,
            gameColumn1: [2],
            gameColumn2: [15],
            gameColumn3: [28],
            suitPile1: [1],
            suitPile2: [14],
            suitPile3: [27],
            suitPile4: [40],
          },
          cardState,
        ),
      ).to.deep.equal({
        ...gameState,
        suitPile1: [1, 2],
        suitPile2: [14, 15],
        suitPile3: [27, 28],
        suitPile4: [40],
      })
    })
  })
  context(
    'when there are 3 cards to move to the suit pile, but one is below the other',
    () => {
      it('should move the cards to the correct suit piles', () => {
        expect(
          moveAllAvailableCards(
            {
              ...gameState,
              gameColumn1: [3, 2],
              gameColumn2: [28],
              suitPile1: [1],
              suitPile2: [14],
              suitPile3: [27],
              suitPile4: [40],
            },
            cardState,
          ),
        ).to.deep.equal({
          ...gameState,
          suitPile1: [1, 2, 3],
          suitPile2: [14],
          suitPile3: [27, 28],
          suitPile4: [40],
        })
      })
    },
  )
})
