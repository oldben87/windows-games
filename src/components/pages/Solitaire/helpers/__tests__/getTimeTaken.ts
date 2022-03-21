import { expect } from 'chai'
import { getTimeTaken } from '../'

describe('getTimeTaken', () => {
  context('when given two dates that are an hour apart', () => {
    it('should return an hour difference', () => {
      expect(
        getTimeTaken(
          new Date('2021-01-01T00:00:00.000Z'),
          new Date('2021-01-01T01:00:00.000Z'),
        ),
      ).to.equal('01:00:00')
    })
  })
  context('when given two dates that are 30 minutes apart', () => {
    it('should return a 30 minute difference', () => {
      expect(
        getTimeTaken(
          new Date('2021-01-01T00:00:00.000Z'),
          new Date('2021-01-01T00:30:00.000Z'),
        ),
      ).to.equal('00:30:00')
    })
  })
  context(
    'when given two dates that are 1 hour 27 minutes and 15 seconds apart',
    () => {
      it('should return a 1:27:15 minute difference', () => {
        expect(
          getTimeTaken(
            new Date('2021-01-01T00:00:00.000Z'),
            new Date('2021-01-01T01:27:15.674Z'),
          ),
        ).to.equal('01:27:15')
      })
    },
  )
  context(
    'when given two dates that are 5 hour 59 minutes and 59 seconds apart',
    () => {
      it('should return a 5:59:59 minute difference', () => {
        expect(
          getTimeTaken(
            new Date('2021-01-01T00:00:00.000Z'),
            new Date('2021-01-01T05:59:59.999Z'),
          ),
        ).to.equal('05:59:59')
      })
    },
  )
})
