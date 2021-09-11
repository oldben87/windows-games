import { setIdOrMoveCard } from 'helpers'
import { CardPile, CardState, GameState } from 'types'
import { GameCard, GameCardTop } from '../furniture'

interface Props {
  cardIndex: number
  index: number
  column: CardPile
  selectedId: string | null
  setSelectedId: (id: string | null) => void
  cardState: CardState
  setCardState: (state: CardState) => void
  gameState: GameState
  setGameState: (state: GameState) => void
  columnName: string
}
export const CardOrCardTop = ({
  cardIndex,
  index,
  column,
  selectedId,
  setSelectedId,
  cardState,
  setCardState,
  gameState,
  setGameState,
  columnName,
}: Props) => {
  const card = cardState[cardIndex]
  const lastCard = index === column.length - 1
  const isFirst = index === 0

  if (lastCard) {
    return (
      <GameCard
        key={`${index}-${card.id}`}
        card={card}
        faceUp={lastCard || card.visible}
        isFirst={isFirst}
        selectedId={selectedId}
        onClick={() => {
          setIdOrMoveCard(
            selectedId,
            setSelectedId,
            cardState,
            setCardState,
            gameState,
            setGameState,
            columnName,
          )
        }}
      />
    )
  }

  return (
    <GameCardTop
      key={`${index}-${card.id}`}
      isFirst={isFirst}
      card={card}
      faceUp={card.visible}
      zindex={index}
      onClick={() => {}}
      selectedId={selectedId}
    />
  )
}
