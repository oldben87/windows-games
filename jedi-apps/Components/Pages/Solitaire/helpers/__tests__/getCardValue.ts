import { getCardValue } from '../getCardsForGame'
import { expect } from 'chai'
import { SuitEnum } from '../../types'

describe('getCardValue', () => {
  context('card number is 1', () => {
    it('should return the ace of spades', () => {
      const card = getCardValue(1)
      expect(card).to.deep.equal({
        id: 1,
        value: 1,
        suit: SuitEnum.spades,
        isRed: false,
      })
    })
  })
  context('card number is 26', () => {
    it('should return the King of Hearts', () => {
      const card = getCardValue(26)
      expect(card).to.deep.equal({
        id: 26,
        value: 13,
        suit: SuitEnum.hearts,
        isRed: true,
      })
    })
  })
  context('card number is 32', () => {
    it('should return the 6 of Clubs', () => {
      const card = getCardValue(32)
      expect(card).to.deep.equal({
        id: 32,
        value: 6,
        suit: SuitEnum.clubs,
        isRed: false,
      })
    })
  })
  context('card number is 50', () => {
    it('should return the Jack of Diamonds', () => {
      const card = getCardValue(50)
      expect(card).to.deep.equal({
        id: 50,
        value: 11,
        suit: SuitEnum.diamonds,
        isRed: true,
      })
    })
  })
})
