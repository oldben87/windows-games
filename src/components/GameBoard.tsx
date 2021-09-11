import { useState, useEffect } from 'react'
import { Flex, Spinner } from '@chakra-ui/react'
import { Background, PageTitle } from './furniture'
import { CardPileColumn } from './CardPileColumn'
import { HiddenSpareDeckPile } from './HiddenSpareDeckPile'
import { ShowingSpareDeckPile } from './ShowingSpareDeckPile'
import { getShuffledDeck, setInitialGameState, getCardValue } from 'helpers'
import { CardInfo, GameState, SuitEnum, CardState } from 'types'
import { SuitPile } from './SuitPile'

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
          <Flex p={5} justify="space-between" maxWidth="800px">
            <Flex w="200px" ml={8} justify="space-between">
              <HiddenSpareDeckPile
                setSelectedId={setSelectedId}
                cardState={cardState}
                setCardState={setCardState}
                gameState={gameState}
                setGameState={setGameState}
              />
              <ShowingSpareDeckPile
                selectedId={selectedId}
                setSelectedId={setSelectedId}
                cardState={cardState}
                setCardState={setCardState}
                gameState={gameState}
                setGameState={setGameState}
              />
            </Flex>

            <Flex w="400px" justify="space-between" mr={8}>
              <SuitPile
                gameState={gameState}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
                cardState={cardState}
                setCardState={setCardState}
                setGameState={setGameState}
                columnName={'suitPile1'}
                suit={SuitEnum.spades}
              />
              <SuitPile
                gameState={gameState}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
                cardState={cardState}
                setCardState={setCardState}
                setGameState={setGameState}
                columnName={'suitPile2'}
                suit={SuitEnum.hearts}
              />
              <SuitPile
                gameState={gameState}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
                cardState={cardState}
                setCardState={setCardState}
                setGameState={setGameState}
                columnName={'suitPile3'}
                suit={SuitEnum.clubs}
              />
              <SuitPile
                gameState={gameState}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
                cardState={cardState}
                setCardState={setCardState}
                setGameState={setGameState}
                columnName={'suitPile4'}
                suit={SuitEnum.diamonds}
              />
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
