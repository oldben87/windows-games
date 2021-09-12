import { getSelectedCardPosition } from '../'
import { expect } from 'chai'
import { SelectedCardPositionEnum } from '../../types'

describe('getSelectedCardPosition', () => {
  context('when no selectedIndex is provided', () => {
    it('should return null', () => {
      expect(getSelectedCardPosition([1, 2, 3, 4], 3, null)).to.equal(null)
    })
  })
  context('when current card is higher in pile than selected card', () => {
    it('should return null', () => {
      expect(getSelectedCardPosition([1, 2, 3, 4], 2, 3)).to.equal(null)
    })
  })
  context('when last card in pile is selected', () => {
    it('should return singleCard', () => {
      expect(getSelectedCardPosition([1, 2, 3, 4], 3, 3)).to.equal(
        SelectedCardPositionEnum.singleCard,
      )
    })
  })
  context(
    'when current card in pile is lower in pile than selected card',
    () => {
      it('should return bottom', () => {
        expect(getSelectedCardPosition([1, 2, 3, 4], 3, 2)).to.equal(
          SelectedCardPositionEnum.bottom,
        )
      })
    },
  )
  context(
    'when current card in pile is lower in pile than selected card',
    () => {
      it('should return middle if it is not the bottom card', () => {
        expect(getSelectedCardPosition([1, 2, 3, 4], 2, 1)).to.equal(
          SelectedCardPositionEnum.middle,
        )
      })
    },
  )
  context('when current card is the selected card', () => {
    it('should return top if there are cards below it', () => {
      expect(getSelectedCardPosition([1, 2, 3, 4], 1, 1)).to.equal(
        SelectedCardPositionEnum.top,
      )
    })
  })
})
