import {moveCardToPile} from "./moveCardToPile"
import {CardState, GameState} from "components/pages/Solitaire/types"

export const setIdOrMoveCard = (
  selectedId: string | null,
  setSelectedId: (id: string | null) => void,
  cardState: CardState,
  setCardState: (state: CardState) => void,
  gameState: GameState,
  setGameState: (state: GameState) => void,
  columnName: string,
) => {
  if (selectedId !== null) {
    moveCardToPile(
      gameState,
      setGameState,
      selectedId,
      setSelectedId,
      cardState,
      setCardState,
      columnName,
    )
    return
  }

  if (selectedId === null && gameState[columnName].length > 0) {
    const arrayIndex = gameState[columnName].length - 1
    setSelectedId(gameState[columnName][arrayIndex].toString())
    return
  }

  return
}
