import { Flex } from '@chakra-ui/react'
import { setIdOrMoveCard } from 'helpers'
import { CardState, GameState } from 'types'
import { CardOrCardTop } from './CardOrCardTop'
import { CardEmpty } from './furniture'

interface CardPileColumnProps {
  selectedId: string | null
  setSelectedId: (id: string | null) => void
  cardState: CardState
  setCardState: (state: CardState) => void
  gameState: GameState
  setGameState: (state: GameState) => void
  columnName: string
}

export const CardPileColumn = (props: CardPileColumnProps) => {
  const {
    gameState,
    selectedId,
    setSelectedId,
    cardState,
    setCardState,
    setGameState,
    columnName,
  } = props
  return (
    <Flex w="90px" direction="column" justify="flex-start">
      {gameState[columnName].length !== 0 ? (
        gameState[columnName].map((card, index, pile) => (
          <CardOrCardTop
            cardIndex={card}
            index={index}
            column={pile}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            cardState={cardState}
            setCardState={setCardState}
            gameState={gameState}
            setGameState={setGameState}
            columnName={columnName}
          />
        ))
      ) : (
        <CardEmpty
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
      )}
    </Flex>
  )
}
