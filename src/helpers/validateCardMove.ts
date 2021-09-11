import { GameState, CardState, CardInfo } from 'types'

const emptyArrayAndCardToMatch = (
  cardPile: Array<number>,
  selectedValue: number,
  valueToMatch: number,
) => {
  console.log(selectedValue, valueToMatch)
  return !cardPile.length && selectedValue === valueToMatch
}

const nextValueDownAndOppositeSuit = (
  cardPile: Array<number>,
  selectedCard: CardInfo,
  cardToPlaceOn: CardInfo,
) => {
  return (
    !!cardPile.length &&
    cardToPlaceOn.value - 1 === selectedCard.value &&
    cardToPlaceOn.isRed !== selectedCard.isRed
  )
}

const nextCardInSuit = (
  cardPile: Array<number>,
  selectedCard: CardInfo,
  cardToPlaceOn: CardInfo,
) => {
  return (
    !!cardPile.length &&
    cardToPlaceOn.value + 1 === selectedCard.value &&
    cardToPlaceOn.isRed === selectedCard.isRed
  )
}

export function validateCardMove(
  gameState: GameState,
  cardState: CardState,
  selectedId: string,
  columnName: string,
): boolean {
  const selectedCard = cardState[selectedId]
  const targetColumn = gameState[columnName]
  const lastCardinTargetColumn =
    cardState[targetColumn[targetColumn.length - 1]]

  if (gameState[columnName].find(num => num.toString() === selectedId)) {
    return false
  }

  switch (columnName) {
    case 'gameColumn1':
    case 'gameColumn2':
    case 'gameColumn3':
    case 'gameColumn4':
    case 'gameColumn5':
    case 'gameColumn6':
    case 'gameColumn7':
    case 'gameColumn8':
      return (
        emptyArrayAndCardToMatch(
          gameState[columnName],
          selectedCard.value,
          13,
        ) ||
        nextValueDownAndOppositeSuit(
          gameState[columnName],
          selectedCard,
          lastCardinTargetColumn,
        )
      )
    case 'suitPile1':
    case 'suitPile2':
    case 'suitPile3':
    case 'suitPile4':
      return (
        emptyArrayAndCardToMatch(
          gameState[columnName],
          selectedCard.value,
          1,
        ) ||
        nextCardInSuit(
          gameState[columnName],
          selectedCard,
          lastCardinTargetColumn,
        )
      )

    case 'sparePileHidden':
    case 'sparePileShowing':
      return true
    default:
      return false
  }
}
