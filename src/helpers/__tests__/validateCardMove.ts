import { expect } from 'chai'
import { validateCardMove } from '../validateCardMove'
import { GameState, CardState, CardInfo } from '../../types'
import { getShuffledDeck, getCardValue } from '../'

const shuffledDeck = getShuffledDeck()

const getCardState = (shuffledDeck: Array<number>): CardState => {
  return shuffledDeck.reduce<{ [key: string]: CardInfo }>(
    (acc: CardState, index: number) => {
      return { ...acc, [index.toString()]: getCardValue(index) }
    },
    {},
  )
}

const cardState: CardState = getCardState(shuffledDeck)

const gameState: GameState = {
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

describe('validateCardMove', () => {
  context('when card is moving to same pile', () => {
    it('should return false', () => {
      expect(
        validateCardMove(
          { ...gameState, gameColumn1: [1] },
          cardState,
          '1',
          'gameColumn1',
        ),
      ).equals(false)
    })
  })
  context('when card is moving to a game column pile', () => {
    it('should return false if pile is empty and card is not a king', () => {
      expect(
        validateCardMove(
          { ...gameState, gameColumn1: [] },
          cardState,
          '1',
          'gameColumn1',
        ),
      ).equals(false)
    })
    it('should return true if pile is empty and card is a king', () => {
      expect(
        validateCardMove(
          { ...gameState, gameColumn1: [] },
          cardState,
          '13',
          'gameColumn1',
        ),
      ).equals(true)
    })
    it('should return false if pile is not empty and card is not the next value down', () => {
      expect(
        validateCardMove(
          { ...gameState, gameColumn1: [13] },
          cardState,
          '24',
          'gameColumn1',
        ),
      ).equals(false)
    })
    it('should return false if pile is not empty and card is the next value down but the same colour card', () => {
      expect(
        validateCardMove(
          { ...gameState, gameColumn1: [13] },
          cardState,
          '12',
          'gameColumn1',
        ),
      ).equals(false)
    })
    it('should return true if pile is not empty and card is the next value down and a different colour card', () => {
      expect(
        validateCardMove(
          { ...gameState, gameColumn1: [13] },
          cardState,
          '51',
          'gameColumn1',
        ),
      ).equals(true)
    })
  })
  context('when card is moving to a suit pile column', () => {
    it('should return false if pile is empty and card is not an ace', () => {
      expect(
        validateCardMove(
          { ...gameState, suitPile1: [] },
          cardState,
          '2',
          'suitPile1',
        ),
      ).equals(false)
    })
    it('should return true if pile is empty and card is an ace', () => {
      expect(
        validateCardMove(
          { ...gameState, suitPile1: [] },
          cardState,
          '1',
          'suitPile1',
        ),
      ).equals(true)
    })
    it('should return false if pile is not empty and card is not the next value up', () => {
      expect(
        validateCardMove(
          { ...gameState, suitPile1: [1, 2] },
          cardState,
          '4',
          'suitPile1',
        ),
      ).equals(false)
    })
    it('should return false if pile is not empty and card is the next value up but the wrong suit', () => {
      expect(
        validateCardMove(
          { ...gameState, suitPile1: [1, 2] },
          cardState,
          '16',
          'suitPile1',
        ),
      ).equals(false)
    })
    it('should return true if pile is not empty and card is the next value up and the same suit', () => {
      expect(
        validateCardMove(
          { ...gameState, suitPile1: [1, 2] },
          cardState,
          '3',
          'suitPile1',
        ),
      ).equals(true)
    })
  })
})
