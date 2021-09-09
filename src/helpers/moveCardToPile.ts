import { GameState, CardState, CardPile } from 'types'

export const moveCardToPile = (
  gameState: GameState,
  setGameState: (state: GameState) => void,
  selectedId: string,
  setSelectedId: (id: string | null) => void,
  cardState: CardState,
  setCardState: (state: CardState) => void,
  arrayToMoveTo: string,
) => {
  if (selectedId === null) {
    return
  }
  // find array with the card inside.
  const initialArray = Object.entries(gameState).find(
    ([_, cardPile]: [string, CardPile]) => {
      return cardPile.find(card => card.toString() === selectedId) !== undefined
    },
  )
  if (initialArray === undefined) {
    return
  }

  if (initialArray[0] === arrayToMoveTo) {
    return
  }

  // set cards to be visible
  const newLastCardInOldCardPile =
    cardState[initialArray[1][initialArray[1].length - 2]]

  if (newLastCardInOldCardPile !== undefined) {
    setCardState({
      ...cardState,
      [newLastCardInOldCardPile.id]: {
        ...newLastCardInOldCardPile,
        visible: true,
      },
    })
  }

  const lastCardInNewCardPile =
    cardState[gameState[arrayToMoveTo][gameState[arrayToMoveTo].length - 1]]

  if (lastCardInNewCardPile !== undefined) {
    setCardState({
      ...cardState,
      [lastCardInNewCardPile.id]: { ...lastCardInNewCardPile, visible: true },
    })
  }

  setGameState({
    ...gameState,
    [initialArray[0]]: initialArray[1].filter(
      number => number.toString() !== selectedId,
    ),
    [arrayToMoveTo]: [...gameState[arrayToMoveTo], parseInt(selectedId, 10)],
  })

  setSelectedId(null)
}
