import {CardState, GameState, SuitEnum} from "../types"
import {last, clone, dropLast} from "ramda"
import {validateCardMove} from "../helpers"

const getSuitPile = (suit: SuitEnum) => {
  switch (suit) {
    case SuitEnum.spades:
      return "suitPile1"

    case SuitEnum.hearts:
      return "suitPile2"

    case SuitEnum.clubs:
      return "suitPile3"

    default:
      return "suitPile4"
  }
}

export const moveAllAvailableCards = (
  gameState: GameState,
  cardState: CardState,
): GameState => {
  let newGameState = clone(gameState)

  const columnList = [
    "gameColumn1",
    "gameColumn2",
    "gameColumn3",
    "gameColumn4",
    "gameColumn5",
    "gameColumn6",
    "gameColumn7",
    "gameColumn8",
    "sparePileShowing",
  ]

  let i = 0

  while (i < 9) {
    const pileName = columnList[i]

    const selectedId = last(newGameState[pileName])

    if (selectedId === undefined || selectedId === null) {
      i++
      continue
    }

    const selectedCard = cardState[selectedId.toString()]

    const suitPile = getSuitPile(selectedCard.suit)

    const cardCanMove = validateCardMove(
      newGameState,
      cardState,
      selectedId.toString(),
      suitPile,
      true,
    )

    if (!cardCanMove) {
      i++
      continue
    }

    newGameState = {
      ...newGameState,
      [suitPile]: [...newGameState[suitPile], selectedId],
      [pileName]: [...dropLast(1, newGameState[pileName])],
    }

    i = 0
    continue
  }

  return newGameState
}
