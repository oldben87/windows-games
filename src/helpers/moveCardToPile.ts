import { GameState, CardState, CardPile, CardInfo } from 'types'

const findCurrentArray = (gameState: GameState, selectedId: string) => {
  return Object.entries(gameState).find(([_, cardPile]: [string, CardPile]) => {
    return cardPile.find(card => card.toString() === selectedId) !== undefined
  })
}

const makeCardVisible = (cardState: CardState, card: CardInfo): CardState => {
  return {
    ...cardState,
    [card.id]: {
      ...card,
      visible: true,
    },
  }
}

const moveCards = (
  gameState: GameState,
  initialArray: [string, CardPile],
  selectedId: string,
  arrayToMoveTo: string,
) => {
  return {
    ...gameState,
    [initialArray[0]]: initialArray[1].filter(
      number => number.toString() !== selectedId,
    ),
    [arrayToMoveTo]: [...gameState[arrayToMoveTo], parseInt(selectedId, 10)],
  }
}

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
  const initialArray = findCurrentArray(gameState, selectedId)

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
    setCardState(makeCardVisible(cardState, newLastCardInOldCardPile))
  }

  const lastCardInNewCardPile =
    cardState[gameState[arrayToMoveTo][gameState[arrayToMoveTo].length - 1]]

  if (lastCardInNewCardPile !== undefined) {
    setCardState(makeCardVisible(cardState, lastCardInNewCardPile))
  }

  setGameState(moveCards(gameState, initialArray, selectedId, arrayToMoveTo))

  setSelectedId(null)
}
