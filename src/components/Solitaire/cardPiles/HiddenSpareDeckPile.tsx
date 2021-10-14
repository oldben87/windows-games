import { setIdOrMoveCard } from 'components/Solitaire/helpers'
import { CardState, GameState } from 'components/Solitaire/types'
import { CardBack, CardEmpty } from '../furniture'

interface Props {
  setSelectedId: (id: string | null) => void
  cardState: CardState
  setCardState: (state: CardState) => void
  gameState: GameState
  setGameState: (state: GameState) => void
}

export const HiddenSpareDeckPile = (props: Props) => {
  const { gameState, setSelectedId, cardState, setCardState, setGameState } =
    props
  return gameState.sparePileHidden.length ? (
    <CardBack
      onClick={() => {
        const hiddenPileHasCards = gameState.sparePileHidden.length > 0

        if (hiddenPileHasCards) {
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
        }
      }}
    />
  ) : (
    <CardEmpty
      onClick={() => {
        setGameState({
          ...gameState,
          sparePileHidden: gameState.sparePileShowing.reverse(),
          sparePileShowing: [],
        })
      }}
    />
  )
}
