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
import { getShuffledDeck, setInitialGameState, getCardValue } from 'helpers'
import { CardInfo, CardPile, GameState, SuitEnum } from 'types'

const cardOrCardTop = (cardIndex: number, index: number, column: CardPile) => {
  const card = getCardValue(cardIndex)
  const lastCard = index === column.length - 1
  const isFirst = index === 0
  return lastCard ? (
    <GameCard
      key={`${index}-${card.id}`}
      card={card}
      faceUp={lastCard}
      isFirst={isFirst}
    />
  ) : (
    <GameCardTop
      key={`${index}-${card.id}`}
      isFirst={isFirst}
      card={card}
      faceUp={lastCard || card.visible}
      zindex={index}
    />
  )
}

export default function GameBoard() {
  const [shuffledDeck] = useState<Array<number>>(getShuffledDeck())
  const [initialLoad, setInitialLoad] = useState(false)
  const [cardState, setCardState] = useState<{ [key: string]: CardInfo }>({})
  const [gameState, setGameState] = useState<GameState | null>(null)

  useEffect(() => {
    if (shuffledDeck.length && initialLoad === false) {
      setGameState(setInitialGameState(shuffledDeck))
      setInitialLoad(true)
      setCardState(
        shuffledDeck.reduce<{ [key: string]: CardInfo }>((acc, item) => {
          return { ...acc, [`${item}`]: getCardValue(item) }
        }, {}),
      )
    }
  }, [shuffledDeck, initialLoad])

  console.log(cardState)
  return (
    <Background>
      <PageTitle title="Solitaire" />

      {gameState !== null && shuffledDeck.length ? (
        <Flex direction="column" justify="flex-start">
          <Flex p={5} justify="space-between" w="800px">
            <Flex w="200px" ml={8} justify="space-between">
              {gameState.sparePileHidden.length ? <CardBack /> : <CardEmpty />}
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
                />
              ) : (
                <CardEmpty />
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
                />
              ) : (
                <CardEmpty suit={SuitEnum.spades} />
              )}
              {gameState.suitPile2.length ? (
                <GameCard
                  card={
                    cardState[
                      gameState.suitPile1[gameState.suitPile1.length - 1]
                    ]
                  }
                  faceUp={true}
                />
              ) : (
                <CardEmpty suit={SuitEnum.hearts} />
              )}
              {gameState.suitPile3.length ? (
                <GameCard
                  card={
                    cardState[
                      gameState.suitPile1[gameState.suitPile1.length - 1]
                    ]
                  }
                  faceUp={true}
                />
              ) : (
                <CardEmpty suit={SuitEnum.clubs} />
              )}
              {gameState.suitPile4.length ? (
                <GameCard
                  card={
                    cardState[
                      gameState.suitPile1[gameState.suitPile1.length - 1]
                    ]
                  }
                  faceUp={true}
                />
              ) : (
                <CardEmpty suit={SuitEnum.diamonds} />
              )}
            </Flex>
          </Flex>

          <Flex justify="space-evenly" width="800px" alignSelf="center">
            <Flex w="90px" direction="column" justify="flex-start">
              {gameState.gameColumn1.map(cardOrCardTop)}
            </Flex>
            <Flex w="90px" direction="column" justify="flex-start">
              {gameState.gameColumn2.map(cardOrCardTop)}
            </Flex>
            <Flex w="90px" direction="column" justify="flex-start">
              {gameState.gameColumn3.map(cardOrCardTop)}
            </Flex>
            <Flex w="90px" direction="column" justify="flex-start">
              {gameState.gameColumn4.map(cardOrCardTop)}
            </Flex>
            <Flex w="90px" direction="column" justify="flex-start">
              {gameState.gameColumn5.map(cardOrCardTop)}
            </Flex>
            <Flex w="90px" direction="column" justify="flex-start">
              {gameState.gameColumn6.map(cardOrCardTop)}
            </Flex>
            <Flex w="90px" direction="column" justify="flex-start">
              {gameState.gameColumn7.map(cardOrCardTop)}
            </Flex>
            <Flex w="90px" direction="column" justify="flex-start">
              {gameState.gameColumn8.map(cardOrCardTop)}
            </Flex>
          </Flex>
        </Flex>
      ) : (
        <Spinner h={20} w={20} ml={10} color="primaryBlue" />
      )}
    </Background>
  )
}
