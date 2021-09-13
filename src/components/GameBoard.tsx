import { useState, useEffect } from 'react'
import {
  Flex,
  Spinner,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerHeader,
  DrawerContent,
  DrawerBody,
  Button,
  Text,
} from '@chakra-ui/react'
import { Background, PageTitle } from './furniture'
import { CardPileColumn } from './cardPiles/CardPileColumn'
import { HiddenSpareDeckPile } from './cardPiles/HiddenSpareDeckPile'
import { ShowingSpareDeckPile } from './cardPiles/ShowingSpareDeckPile'
import { getShuffledDeck, setInitialGameState, getCardState } from 'helpers'
import { GameState, SuitEnum, CardState } from 'types'
import { SuitPile } from './cardPiles/SuitPile'

export default function GameBoard() {
  const [shuffledDeck, setShuffledDeck] = useState<Array<number>>(
    getShuffledDeck(),
  )
  const [initialLoad, setInitialLoad] = useState(false)
  const [cardState, setCardState] = useState<CardState>({})
  const [gameState, setGameState] = useState<GameState | null>(null)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    if (shuffledDeck.length && initialLoad === false) {
      setGameState(setInitialGameState(shuffledDeck))
      setInitialLoad(true)
      setCardState(getCardState(shuffledDeck))
    }
  }, [shuffledDeck, initialLoad])

  useEffect(() => {
    if (
      gameState &&
      gameState.suitPile1.length === 13 &&
      gameState.suitPile2.length === 13 &&
      gameState.suitPile3.length === 13 &&
      gameState.suitPile4.length === 13
    ) {
      onOpen()
    }
  }, [gameState])

  return (
    <Background>
      <Flex direction="column">
        <PageTitle title="Solitaire" />
        <Button
          background="darkerBlue"
          _hover={{ bg: 'primaryBlue' }}
          _active={{ bg: 'darkerBlue' }}
          color="white"
          border="none"
          mt={2}
          onClick={() => {
            setInitialLoad(false)
            setShuffledDeck(getShuffledDeck())
          }}
        >
          Reset Game
        </Button>
      </Flex>
      {gameState !== null && shuffledDeck.length ? (
        <Flex
          direction="column"
          justify="flex-start"
          onClick={e => {
            e.stopPropagation()
            setSelectedId(null)
          }}
        >
          <Flex
            p={5}
            justify="space-between"
            alignItems="center"
            maxWidth="800px"
          >
            <Flex
              w="200px"
              h="150px"
              ml={8}
              justify="space-between"
              alignItems="center"
            >
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
      <Drawer placement="top" onClose={onClose} isOpen={isOpen} size="xl">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">
            You won, well done!
          </DrawerHeader>
          <DrawerBody>
            <Text>Press the reset button to start a new game!</Text>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Background>
  )
}
