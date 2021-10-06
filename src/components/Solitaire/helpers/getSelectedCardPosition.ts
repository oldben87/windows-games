import { SelectedCardPositionEnum, CardPile } from 'types'

export const getSelectedCardPosition = (
  column: CardPile,
  cardIndex: number,
  selectedIndex: number | null,
): SelectedCardPositionEnum | null => {
  if (selectedIndex === null) {
    return null
  }

  if (cardIndex < selectedIndex) {
    return null
  }

  const isBottomCard = column.length - 1 === cardIndex

  if (cardIndex === selectedIndex && isBottomCard) {
    return SelectedCardPositionEnum.singleCard
  }

  if (isBottomCard) {
    return SelectedCardPositionEnum.bottom
  }

  if (cardIndex > selectedIndex) {
    return SelectedCardPositionEnum.middle
  }

  return SelectedCardPositionEnum.top
}
