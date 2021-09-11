import { setIdOrMoveCard } from 'helpers'
import { CardState, GameState, SuitEnum } from 'types'
import { CardEmpty, GameCard } from './furniture'

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
        const lastCardInArray =
          gameState[columnName][gameState[columnName].length - 1]
        if (
          selectedId &&
          cardState[selectedId].suit === suit &&
          selectedId === (lastCardInArray + 1).toString()
        ) {
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
  ) : (
    <CardEmpty
      suit={suit}
      onClick={() => {
        if (
          selectedId &&
          cardState[selectedId].suit === suit &&
          selectedId === '1'
        ) {
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
