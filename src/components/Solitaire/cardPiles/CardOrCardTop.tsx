import {setIdOrMoveCard} from "components/Solitaire/helpers"
import {getSelectedCardPosition} from "components/Solitaire/helpers"
import {CardPile, CardState, GameState} from "components/Solitaire/types"
import {GameCard, GameCardTop} from "../furniture"

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
  selectedIndex: number | null
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
  selectedIndex,
}: Props) => {
  const card = cardState[cardIndex]
  const lastCard = index === column.length - 1
  const isFirst = index === 0

  const selectedCardIsInColumn = gameState[columnName].some(
    (num) => num.toString() === selectedId,
  )

  const position = selectedCardIsInColumn
    ? getSelectedCardPosition(gameState[columnName], index, selectedIndex)
    : null

  if (lastCard) {
    return (
      <GameCard
        key={`${index}-${card.id}`}
        card={card}
        faceUp={lastCard || card.visible}
        isFirst={isFirst}
        selectedId={selectedId}
        position={position}
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
      position={position}
      onClick={() => {
        if (!card.visible) {
          return
        }

        if (selectedId === null) {
          setSelectedId(card.id.toString())
          return
        }
      }}
      selectedId={selectedId}
    />
  )
}
