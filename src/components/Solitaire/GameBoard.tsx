import { useState, useEffect } from 'react'
import {
  Flex,
  Spinner,
  useDisclosure,
  Button,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
} from '@chakra-ui/react'
import { Background, PageTitle } from './furniture'
import { CardPileColumn } from './cardPiles/CardPileColumn'
import { HiddenSpareDeckPile } from './cardPiles/HiddenSpareDeckPile'
import { ShowingSpareDeckPile } from './cardPiles/ShowingSpareDeckPile'
import {
  getShuffledDeck,
  setInitialGameState,
  getCardState,
  moveAllAvailableCards,
  getTimeTaken,
} from 'components/Solitaire/helpers'
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
  const [score, setScore] = useState(0)
  const [gameStarted, setGameStarted] = useState(new Date())

  useEffect(() => {
    if (shuffledDeck.length && initialLoad === false) {
      setGameState(setInitialGameState(shuffledDeck))
      setInitialLoad(true)
      setCardState(getCardState(shuffledDeck))
    }
  }, [shuffledDeck, initialLoad])

  useEffect(() => {
    if (gameState) {
      const spadesScore = gameState.suitPile1.length * 5 || 0
      const heartsScore = gameState.suitPile2.length * 5 || 0
      const clubsScore = gameState.suitPile3.length * 5 || 0
      const diamondsScore = gameState.suitPile4.length * 5 || 0

      setScore(spadesScore + heartsScore + clubsScore + diamondsScore)
    }
  }, [gameState])

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
      <Flex direction="column" maxWidth={'150px'}>
        <PageTitle title="Solitaire" />
        <Flex direction="column" textAlign="center" p={2}>
          <Text
            fontWeight={600}
            fontSize="lg"
            color="white"
            letterSpacing="1px"
          >
            Score:
          </Text>
          <Text
            fontWeight={500}
            fontSize="md"
            color="white"
            letterSpacing="1px"
          >
            {score}
          </Text>
        </Flex>
        <Button
          background="darkerBlue"
          _hover={{ bg: 'primaryBlue', border: 'none' }}
          _active={{ bg: 'darkerBlue', border: 'none' }}
          color="white"
          border="none"
          mt={2}
          onClick={() => {
            if (gameState) {
              setGameState(moveAllAvailableCards(gameState, cardState))
            }
          }}
        >
          Suit Up
        </Button>
        <Button
          background="darkerBlue"
          _hover={{ bg: 'primaryBlue' }}
          _active={{ bg: 'darkerBlue' }}
          color="white"
          border="none"
          mt={2}
          onClick={() => {
            setInitialLoad(false)
            setGameStarted(new Date())
            setShuffledDeck(getShuffledDeck())
          }}
        >
          New Game
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
      <Modal onClose={onClose} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader borderBottomWidth="1px">Well done!</ModalHeader>
          <ModalBody>
            <Text>Press the new game button to start a new game!</Text>
            <Text>It took you {getTimeTaken(gameStarted, new Date())}</Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Background>
  )
}
