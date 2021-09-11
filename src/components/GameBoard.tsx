import { useState, useEffect } from 'react'
import { Flex, Spinner } from '@chakra-ui/react'
import {
  Background,
  PageTitle,
  GameCard,
  GameCardTop,
  CardBack,
  CardEmpty,
} from './furniture'
import {
  getShuffledDeck,
  setInitialGameState,
  getCardValue,
  moveCardToPile,
} from 'helpers'
import { CardInfo, CardPile, GameState, SuitEnum, CardState } from 'types'

const setIdOrMoveCard = (
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

  if (selectedId === null) {
    const arrayIndex = gameState[columnName].length - 1
    setSelectedId(gameState[columnName][arrayIndex].toString())
    return
  }

  return
}

const cardOrCardTop = (
  cardIndex: number,
  index: number,
  column: CardPile,
  selectedId: string | null,
  setSelectedId: (id: string | null) => void,
  cardState: CardState,
  setCardState: (state: CardState) => void,
  gameState: GameState,
  setGameState: (state: GameState) => void,
  columnName: string,
) => {
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

interface CardPileColumnProps {
  selectedId: string | null
  setSelectedId: (id: string | null) => void
  cardState: CardState
  setCardState: (state: CardState) => void
  gameState: GameState
  setGameState: (state: GameState) => void
  columnName: string
}

const CardPileColumn = (props: CardPileColumnProps) => {
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
        gameState[columnName].map((card, index, pile) =>
          cardOrCardTop(
            card,
            index,
            pile,
            selectedId,
            setSelectedId,
            cardState,
            setCardState,
            gameState,
            setGameState,
            columnName,
          ),
        )
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

export default function GameBoard() {
  const [shuffledDeck] = useState<Array<number>>(getShuffledDeck())
  const [initialLoad, setInitialLoad] = useState(false)
  const [cardState, setCardState] = useState<CardState>({})
  const [gameState, setGameState] = useState<GameState | null>(null)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  useEffect(() => {
    if (shuffledDeck.length && initialLoad === false) {
      setGameState(setInitialGameState(shuffledDeck))
      setInitialLoad(true)
      setCardState(
        shuffledDeck.reduce<{ [key: string]: CardInfo }>((acc, index) => {
          return { ...acc, [`${index}`]: getCardValue(index) }
        }, {}),
      )
    }
  }, [shuffledDeck, initialLoad])

  if (gameState) {
    console.log(cardState[gameState.suitPile2[gameState.suitPile2.length - 1]])

    console.log(gameState)
  }

  return (
    <Background>
      <PageTitle title="Solitaire" />

      {gameState !== null && shuffledDeck.length ? (
        <Flex
          direction="column"
          justify="flex-start"
          onClick={e => {
            e.stopPropagation()
            setSelectedId(null)
          }}
        >
          <Flex p={5} justify="space-between" w="800px">
            <Flex w="200px" ml={8} justify="space-between">
              {gameState.sparePileHidden.length ? (
                <CardBack
                  onClick={() => {
                    const hiddenPileHasCards =
                      gameState.sparePileHidden.length > 0

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
              )}
              {gameState.sparePileShowing.length ? (
                <GameCard
                  card={
                    cardState[
                      gameState.sparePileShowing[
                        gameState.sparePileShowing.length - 1
                      ]
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
              )}
            </Flex>

            <Flex w="400px" justify="space-between" mr={8}>
              {gameState.suitPile1.length ? (
                <GameCard
                  card={
                    cardState[
                      gameState.suitPile1[gameState.suitPile1.length - 1]
                    ]
                  }
                  faceUp={true}
                  isFirst={true}
                  selectedId={selectedId}
                  onClick={() => {
                    const lastCardInArray =
                      gameState.suitPile1[gameState.suitPile1.length - 1]
                    if (
                      selectedId &&
                      cardState[selectedId].suit === SuitEnum.spades &&
                      selectedId === (lastCardInArray + 1).toString()
                    ) {
                      setIdOrMoveCard(
                        selectedId,
                        setSelectedId,
                        cardState,
                        setCardState,
                        gameState,
                        setGameState,
                        'suitPile1',
                      )
                    }
                  }}
                />
              ) : (
                <CardEmpty
                  suit={SuitEnum.spades}
                  onClick={() => {
                    if (
                      selectedId &&
                      cardState[selectedId].suit === SuitEnum.spades &&
                      selectedId === '1'
                    ) {
                      setIdOrMoveCard(
                        selectedId,
                        setSelectedId,
                        cardState,
                        setCardState,
                        gameState,
                        setGameState,
                        'suitPile1',
                      )
                    }
                  }}
                />
              )}
              {gameState.suitPile2.length ? (
                <GameCard
                  card={
                    cardState[
                      gameState.suitPile2[gameState.suitPile2.length - 1]
                    ]
                  }
                  faceUp={true}
                  isFirst={true}
                  selectedId={selectedId}
                  onClick={() => {
                    const lastCardInArray =
                      gameState.suitPile2[gameState.suitPile2.length - 1]
                    if (
                      selectedId &&
                      cardState[selectedId].suit === SuitEnum.hearts &&
                      selectedId === (lastCardInArray + 1).toString()
                    ) {
                      setIdOrMoveCard(
                        selectedId,
                        setSelectedId,
                        cardState,
                        setCardState,
                        gameState,
                        setGameState,
                        'suitPile2',
                      )
                    }
                  }}
                />
              ) : (
                <CardEmpty
                  suit={SuitEnum.hearts}
                  onClick={() => {
                    if (
                      selectedId &&
                      cardState[selectedId].suit === SuitEnum.hearts &&
                      selectedId === '14'
                    ) {
                      setIdOrMoveCard(
                        selectedId,
                        setSelectedId,
                        cardState,
                        setCardState,
                        gameState,
                        setGameState,
                        'suitPile2',
                      )
                    }
                  }}
                />
              )}
              {gameState.suitPile3.length ? (
                <GameCard
                  card={
                    cardState[
                      gameState.suitPile3[gameState.suitPile3.length - 1]
                    ]
                  }
                  faceUp={true}
                  isFirst={true}
                  selectedId={selectedId}
                  onClick={() => {
                    const lastCardInArray =
                      gameState.suitPile3[gameState.suitPile3.length - 1]
                    if (
                      selectedId &&
                      cardState[selectedId].suit === SuitEnum.clubs &&
                      selectedId === (lastCardInArray + 1).toString()
                    ) {
                      setIdOrMoveCard(
                        selectedId,
                        setSelectedId,
                        cardState,
                        setCardState,
                        gameState,
                        setGameState,
                        'suitPile3',
                      )
                    }
                  }}
                />
              ) : (
                <CardEmpty
                  suit={SuitEnum.clubs}
                  onClick={() => {
                    if (
                      selectedId &&
                      cardState[selectedId].suit === SuitEnum.clubs &&
                      selectedId === '27'
                    ) {
                      setIdOrMoveCard(
                        selectedId,
                        setSelectedId,
                        cardState,
                        setCardState,
                        gameState,
                        setGameState,
                        'suitPile3',
                      )
                    }
                  }}
                />
              )}
              {gameState.suitPile4.length ? (
                <GameCard
                  card={
                    cardState[
                      gameState.suitPile4[gameState.suitPile4.length - 1]
                    ]
                  }
                  faceUp={true}
                  isFirst={true}
                  selectedId={selectedId}
                  onClick={() => {
                    const lastCardInArray =
                      gameState.suitPile4[gameState.suitPile4.length - 1]
                    if (
                      selectedId &&
                      cardState[selectedId].suit === SuitEnum.diamonds &&
                      selectedId === (lastCardInArray + 1).toString()
                    ) {
                      setIdOrMoveCard(
                        selectedId,
                        setSelectedId,
                        cardState,
                        setCardState,
                        gameState,
                        setGameState,
                        'suitPile4',
                      )
                    }
                  }}
                />
              ) : (
                <CardEmpty
                  suit={SuitEnum.diamonds}
                  onClick={() => {
                    if (
                      selectedId &&
                      cardState[selectedId].suit === SuitEnum.diamonds &&
                      selectedId === '40'
                    ) {
                      setIdOrMoveCard(
                        selectedId,
                        setSelectedId,
                        cardState,
                        setCardState,
                        gameState,
                        setGameState,
                        'suitPile4',
                      )
                    }
                  }}
                />
              )}
            </Flex>
          </Flex>

          <Flex justify="space-evenly" width="800px" alignSelf="center">
            <CardPileColumn
              selectedId={selectedId}
              setSelectedId={setSelectedId}
              cardState={cardState}
              setCardState={setCardState}
              gameState={gameState}
              setGameState={setGameState}
              columnName="gameColumn1"
            />
            <CardPileColumn
              selectedId={selectedId}
              setSelectedId={setSelectedId}
              cardState={cardState}
              setCardState={setCardState}
              gameState={gameState}
              setGameState={setGameState}
              columnName="gameColumn2"
            />
            <CardPileColumn
              selectedId={selectedId}
              setSelectedId={setSelectedId}
              cardState={cardState}
              setCardState={setCardState}
              gameState={gameState}
              setGameState={setGameState}
              columnName="gameColumn3"
            />
            <CardPileColumn
              selectedId={selectedId}
              setSelectedId={setSelectedId}
              cardState={cardState}
              setCardState={setCardState}
              gameState={gameState}
              setGameState={setGameState}
              columnName="gameColumn4"
            />
            <CardPileColumn
              selectedId={selectedId}
              setSelectedId={setSelectedId}
              cardState={cardState}
              setCardState={setCardState}
              gameState={gameState}
              setGameState={setGameState}
              columnName="gameColumn5"
            />
            <CardPileColumn
              selectedId={selectedId}
              setSelectedId={setSelectedId}
              cardState={cardState}
              setCardState={setCardState}
              gameState={gameState}
              setGameState={setGameState}
              columnName="gameColumn6"
            />
            <CardPileColumn
              selectedId={selectedId}
              setSelectedId={setSelectedId}
              cardState={cardState}
              setCardState={setCardState}
              gameState={gameState}
              setGameState={setGameState}
              columnName="gameColumn7"
            />
            <CardPileColumn
              selectedId={selectedId}
              setSelectedId={setSelectedId}
              cardState={cardState}
              setCardState={setCardState}
              gameState={gameState}
              setGameState={setGameState}
              columnName="gameColumn8"
            />
          </Flex>
        </Flex>
      ) : (
        <Spinner h={20} w={20} ml={10} color="primaryBlue" />
      )}
    </Background>
  )
}
