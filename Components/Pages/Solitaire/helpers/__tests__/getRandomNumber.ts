import { getRandomNumber } from '../getCardsForGame'
import { expect } from 'chai'

describe('getRandomNumber', () => {
  context('When function is called with empty array', () => {
    it('should return any number between 1 and 52', () => {
      const randomNumber = getRandomNumber([])
      expect(randomNumber).to.be.greaterThan(0)
      expect(randomNumber).to.be.lessThan(53)
    })
  })
  context('When function is called with nearly full array', () => {
    it('should return any number between 50  and 52', () => {
      const randomNumber = getRandomNumber([
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38,
        39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49,
      ])
      expect(randomNumber).to.be.greaterThan(49)
      expect(randomNumber).to.be.lessThan(53)
    })
  })
  context('When array is missing the number 31', () => {
    it('should return 31', () => {
      const randomNumber = getRandomNumber([
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 32, 33, 34, 35, 36, 37, 38, 39,
        40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52,
      ])
      expect(randomNumber).to.equal(31)
    })
  })
})
