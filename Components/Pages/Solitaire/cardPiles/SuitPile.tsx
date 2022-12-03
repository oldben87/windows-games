import {setIdOrMoveCard} from "../helpers/setIdOrMoveCard"
import {
  CardState,
  GameState,
  SuitEnum,
  SelectedCardPositionEnum,
} from "../types"
import {CardEmpty, GameCard} from "../furniture"

interface Props {
  selectedId: string | null
  setSelectedId: (id: string | null) => void
  cardState: CardState
  setCardState: (state: CardState) => void
  gameState: GameState
  setGameState: (state: GameState) => void
  columnName: string
  suit: SuitEnum
}
export const SuitPile = ({
  gameState,
  selectedId,
  setSelectedId,
  cardState,
  setCardState,
  setGameState,
  columnName,
  suit,
}: Props) => {
  return gameState[columnName].length ? (
    <GameCard
      card={cardState[gameState[columnName][gameState[columnName].length - 1]]}
      faceUp={true}
      isFirst={true}
      selectedId={selectedId}
      onClick={() => {
        if (selectedId && cardState[selectedId].suit === suit) {
          setIdOrMoveCard(
            selectedId,
            setSelectedId,
            cardState,
            setCardState,
            gameState,
            setGameState,
            columnName,
          )
        }
      }}
      position={SelectedCardPositionEnum.singleCard}
    />
  ) : (
    <CardEmpty
      suit={suit}
      onClick={() => {
        if (selectedId && cardState[selectedId].suit === suit) {
          setIdOrMoveCard(
            selectedId,
            setSelectedId,
            cardState,
            setCardState,
            gameState,
            setGameState,
            columnName,
          )
        }
      }}
    />
  )
}
