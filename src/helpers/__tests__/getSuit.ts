import { getSuit } from '../getCardsForGame'
import { expect } from 'chai'
import { SuitEnum } from '../../types'

describe('getSuit', () => {
  context('number is between 1 & 13', () => {
    it('should return Spades', () => {
      expect(getSuit(1)).to.equal(SuitEnum.spades)
      expect(getSuit(5)).to.equal(SuitEnum.spades)
      expect(getSuit(13)).to.equal(SuitEnum.spades)
    })
  })
  context('number is between 14 & 26', () => {
    it('should return Hearts', () => {
      expect(getSuit(14)).to.equal(SuitEnum.hearts)
      expect(getSuit(25)).to.equal(SuitEnum.hearts)
      expect(getSuit(26)).to.equal(SuitEnum.hearts)
    })
  })
  context('number is between 27 & 39', () => {
    it('should return clubs', () => {
      expect(getSuit(27)).to.equal(SuitEnum.clubs)
      expect(getSuit(35)).to.equal(SuitEnum.clubs)
      expect(getSuit(39)).to.equal(SuitEnum.clubs)
    })
  })
  context('number is between 40 & 52', () => {
    it('should return diamonds', () => {
      expect(getSuit(40)).to.equal(SuitEnum.diamonds)
      expect(getSuit(45)).to.equal(SuitEnum.diamonds)
      expect(getSuit(52)).to.equal(SuitEnum.diamonds)
    })
  })
})
