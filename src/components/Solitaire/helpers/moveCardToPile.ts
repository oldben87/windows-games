import { GameState, CardState, CardPile, CardInfo } from 'components/Solitaire/types'
import { validateCardMove } from './validateCardMove'
import { findIndex, last, splitAt } from 'ramda'

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
): GameState => {
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

  const initialArray = findCurrentArray(gameState, selectedId)

  if (initialArray === undefined) {
    return
  }

  const lastCardInPile = last(initialArray[1])
  const isLastCardInPile =
    lastCardInPile !== undefined &&
    cardState[lastCardInPile.toString()].id === cardState[selectedId].id

  if (
    validateCardMove(
      gameState,
      cardState,
      selectedId,
      arrayToMoveTo,
      isLastCardInPile,
    ) === false
  ) {
    setSelectedId(null)
    return
  }

  // set cards visible:
  // selectedCard:
  setCardState(makeCardVisible(cardState, cardState[selectedId]))

  // get index of selectedId
  const selectedIndex = findIndex(
    num => num.toString() === selectedId,
    initialArray[1],
  )

  // get index of newLastCardInPile | undefined
  const newLastCard = initialArray[1][selectedIndex - 1]

  // if newLastCardInPile set to be visible
  if (newLastCard && newLastCard !== undefined && newLastCard !== null) {
    setCardState(makeCardVisible(cardState, cardState[newLastCard.toString()]))
  }

  const lastCardInNewCardPile = last(gameState[arrayToMoveTo])

  if (
    lastCardInNewCardPile &&
    lastCardInNewCardPile !== undefined &&
    lastCardInNewCardPile !== null
  ) {
    setCardState(
      makeCardVisible(cardState, cardState[lastCardInNewCardPile.toString()]),
    )
  }

  if (isLastCardInPile) {
    setGameState(moveCards(gameState, initialArray, selectedId, arrayToMoveTo))
  } else {
    // slice array and add to end of new gameColumn
    const splitArray = splitAt(selectedIndex, initialArray[1])

    setGameState({
      ...gameState,
      [initialArray[0]]: [...splitArray[0]],
      [arrayToMoveTo]: [...gameState[arrayToMoveTo], ...splitArray[1]],
    })
  }

  setSelectedId(null)

  return
}
