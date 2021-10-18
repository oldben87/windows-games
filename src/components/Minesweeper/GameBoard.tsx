import React, {useState} from "react"
import {Flex, Text} from "@chakra-ui/react"
import {getRandomNumber} from "./helpers/getRandomNumber"
import {update} from "ramda"

interface BackgroundProps {
  children: React.ReactNode
}

const Background = ({children}: BackgroundProps) => {
  return (
    <Flex
      as="section"
      minHeight="100vh"
      background="lightGrey"
      p={2}
      direction="column"
      alignItems="center"
    >
      {children}
    </Flex>
  )
}

const GameHeader = ({mineCount}: {mineCount: number}) => {
  return (
    <Flex h="100px" bgColor="grey" w="100%" p={2} justify="space-evenly">
      <Flex bgColor="black" h="100%" w="110px" justify="center" px={2}>
        <Text
          color="red"
          fontWeight={600}
          fontSize={80}
          p={0}
          m={0}
          lineHeight={"100%"}
        >
          {mineCount}
        </Text>
      </Flex>
    </Flex>
  )
}

const getFontColor = (value: number | null) => {
  switch (value) {
    case 1:
    case 5:
      return "blue"
    case 2:
    case 6:
      return "green"
    case 3:
    case 7:
      return "red"
    case 4:
    case 8:
      return "purple"
    default:
      return "black"
  }
}

const MineSquare = ({
  mineSquare,
  gameState,
  setGameState,
}: {
  mineSquare: GameSquare
  gameState: GameState
  setGameState: (state: GameState) => void
}) => {
  const MineSquareHidden = {
    borderWidth: "2px",
    borderColorLeft: "snow",
    borderBottomColor: "black",
    borderColorTop: "snow",
    borderRightColor: "black",
  }

  const MineSquareEmpty = {
    borderWidth: "1px",
    borderColor: "black",
    borderStyle: "dashed",
  }

  const squareBorder = mineSquare.isHidden ? MineSquareHidden : MineSquareEmpty

  return (
    <Flex
      h={8}
      w={8}
      {...squareBorder}
      justify="center"
      alignItems="center"
      onClick={() => {
        const newSquare = {...mineSquare, isHidden: false}
        const newRow = update(
          mineSquare.xCoOrd,
          newSquare,
          gameState[mineSquare.yCoOrd],
        )

        const newState = update(mineSquare.yCoOrd, newRow, gameState)

        setGameState(newState)
      }}
    >
      <Text fontWeight={700} color={getFontColor(mineSquare.value)}>
        {mineSquare.hasFlag
          ? "F"
          : mineSquare.isHidden
          ? null
          : mineSquare.value}
      </Text>
    </Flex>
  )
}

const MineRow = ({
  gameRow,
  gameState,
  setGameState,
}: {
  gameRow: Array<GameSquare>
  gameState: GameState
  setGameState: (state: GameState) => void
}) => {
  return (
    <Flex direction="column">
      {gameRow.map((square) => (
        <MineSquare
          mineSquare={square}
          key={`${square.xCoOrd}-${square.yCoOrd}`}
          gameState={gameState}
          setGameState={setGameState}
        />
      ))}
    </Flex>
  )
}

const MineField = ({
  gameState,
  setGameState,
}: {
  gameState: GameState
  setGameState: (state: GameState) => void
}) => {
  return (
    <Flex m={2}>
      {gameState.map((row, i) => {
        return (
          <MineRow
            gameRow={row}
            key={i.toString()}
            gameState={gameState}
            setGameState={setGameState}
          />
        )
      })}
    </Flex>
  )
}

interface GameSquare {
  isMine: boolean
  hasFlag: boolean
  value: number | null
  xCoOrd: number
  yCoOrd: number
  isHidden: boolean
}

type GameState = Array<Array<GameSquare>>

const createGameState = (
  rows: number,
  columns: number,
  mines: number,
): GameState => {
  const board = []

  const mineList: Array<number> = []

  for (let m = 0; m < mines; m++) {
    const number = getRandomNumber(mineList, rows * columns)
    mineList.push(number)
  }

  let mineCounter = 1

  for (let i = 0; i < rows; i++) {
    const row: Array<GameSquare> = []
    for (let j = 0; j < columns; j++) {
      const isMine = mineList.includes(mineCounter)

      row.push({
        isMine,
        hasFlag: false,
        value: null,
        xCoOrd: j,
        yCoOrd: i,
        isHidden: true,
      })
      mineCounter++
    }
    board.push(row)
  }

  const result = []

  for (let i2 = 0; i2 < rows; i2++) {
    const row2: Array<GameSquare> = []
    for (let j2 = 0; j2 < columns; j2++) {
      row2.push({...board[i2][j2], value: getSquareValue(board, i2, j2)})
    }
    result.push(row2)
  }

  return result
}

function getSquareValue(board: GameState, x: number, y: number): number | null {
  let mineCount = 0

  if (board[x][y].isMine === true) {
    return null
  }

  if (
    board[x - 1] != undefined &&
    board[x - 1][y - 1] != undefined &&
    board[x - 1][y - 1].isMine
  ) {
    mineCount++
  }

  if (
    board[x - 1] != undefined &&
    board[x - 1][y] != undefined &&
    board[x - 1][y].isMine
  ) {
    mineCount++
  }

  if (
    board[x - 1] != undefined &&
    board[x - 1][y + 1] != undefined &&
    board[x - 1][y + 1].isMine
  ) {
    mineCount++
  }

  if (board[x][y - 1] != undefined && board[x][y - 1].isMine) {
    mineCount++
  }

  if (board[x][y + 1] != undefined && board[x][y + 1].isMine) {
    mineCount++
  }

  if (
    board[x + 1] != undefined &&
    board[x + 1][y - 1] != undefined &&
    board[x + 1][y - 1].isMine
  ) {
    mineCount++
  }

  if (
    board[x + 1] != undefined &&
    board[x + 1][y] != undefined &&
    board[x + 1][y].isMine
  ) {
    mineCount++
  }

  if (
    board[x + 1] != undefined &&
    board[x + 1][y + 1] != undefined &&
    board[x + 1][y + 1].isMine
  ) {
    mineCount++
  }

  return mineCount
}

export default function () {
  const mineCount = 45
  const [gameState, setGameState] = useState(createGameState(15, 15, mineCount))

  return (
    <Background>
      <GameHeader mineCount={mineCount} />
      <MineField
        gameState={gameState}
        setGameState={(newState: GameState) => {
          setGameState(newState)
        }}
      />
    </Background>
  )
}
