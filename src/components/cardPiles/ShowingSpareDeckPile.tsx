import { setIdOrMoveCard } from 'helpers'
import { CardState, GameState } from 'types'
import { CardEmpty, GameCard } from '../furniture'

interface Props {
  selectedId: string | null
  setSelectedId: (id: string | null) => void
  cardState: CardState
  setCardState: (state: CardState) => void
  gameState: GameState
  setGameState: (state: GameState) => void
}

export const ShowingSpareDeckPile = (props: Props) => {
  const {
    gameState,
    selectedId,
    setSelectedId,
    cardState,
    setCardState,
    setGameState,
  } = props

  return gameState.sparePileShowing.length ? (
    <GameCard
      card={
        cardState[
          gameState.sparePileShowing[gameState.sparePileShowing.length - 1]
        ]
      }
      faceUp={true}
      isFirst={true}
      selectedId={selectedId}
      onClick={() => {
        setIdOrMoveCard(
          null,
          setSelectedId,
          cardState,
          setCardState,
          gameState,
          setGameState,
          'sparePileShowing',
        )
      }}
      position={null}
    />
  ) : (
    <CardEmpty
      onClick={() => {
        setIdOrMoveCard(
          gameState.sparePileHidden[
            gameState.sparePileHidden.length - 1
          ].toString(),
          setSelectedId,
          cardState,
          setCardState,
          gameState,
          setGameState,
          'sparePileShowing',
        )
      }}
    />
  )
}
