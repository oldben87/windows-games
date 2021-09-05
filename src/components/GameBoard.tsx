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
import { getCardsForGame, setInitialGameState } from 'helpers'
import { CardInfo, CardPile, GameState } from 'types'

const cardOrCardTop = (card: CardInfo, index: number, column: CardPile) => {
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
  const [shuffledDeck, setShuffledDeck] = useState<CardPile>([])
  const [initialLoad, setInitialLoad] = useState(false)
  const [gameState, setGameState] = useState<GameState | null>(null)

  useEffect(() => {
    setShuffledDeck(getCardsForGame())
  }, [])

  useEffect(() => {
    if (shuffledDeck.length && initialLoad === false) {
      setGameState(setInitialGameState(shuffledDeck))
      setInitialLoad(true)
    }
  }, [shuffledDeck, initialLoad])

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
                    gameState.sparePileShowing[
                      gameState.sparePileShowing.length - 1
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
                  card={gameState.suitPile1[gameState.suitPile1.length - 1]}
                  faceUp={true}
                />
              ) : (
                <CardEmpty />
              )}
              {gameState.suitPile2.length ? (
                <GameCard
                  card={gameState.suitPile1[gameState.suitPile1.length - 1]}
                  faceUp={true}
                />
              ) : (
                <CardEmpty />
              )}
              {gameState.suitPile3.length ? (
                <GameCard
                  card={gameState.suitPile1[gameState.suitPile1.length - 1]}
                  faceUp={true}
                />
              ) : (
                <CardEmpty />
              )}
              {gameState.suitPile4.length ? (
                <GameCard
                  card={gameState.suitPile1[gameState.suitPile1.length - 1]}
                  faceUp={true}
                />
              ) : (
                <CardEmpty />
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
