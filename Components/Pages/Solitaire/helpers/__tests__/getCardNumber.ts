import { getCardNumber } from '../getCardsForGame'
import { expect } from 'chai'

describe('getCardNumber', () => {
  context('number is between 1 & 13', () => {
    it('should return value passed in', () => {
      expect(getCardNumber(1)).to.equal(1)
      expect(getCardNumber(5)).to.equal(5)
      expect(getCardNumber(13)).to.equal(13)
    })
  })
  context('number is between 14 & 26', () => {
    it('should return value minus 13', () => {
      expect(getCardNumber(14)).to.equal(1)
      expect(getCardNumber(25)).to.equal(12)
      expect(getCardNumber(26)).to.equal(13)
    })
  })
  context('number is between 27 and 39', () => {
    it('should value minus 26', () => {
      expect(getCardNumber(27)).to.equal(1)
      expect(getCardNumber(35)).to.equal(9)
      expect(getCardNumber(39)).to.equal(13)
    })
  })
  context('number is between 40 & 52', () => {
    it('should return minus 39', () => {
      expect(getCardNumber(40)).to.equal(1)
      expect(getCardNumber(45)).to.equal(6)
      expect(getCardNumber(52)).to.equal(13)
    })
  })
})
