import React from "react"
import {Flex, Text} from "@chakra-ui/react"
import {getRandomNumber} from "./helpers/getRandomNumber"

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
    default:
      return "black"
  }
}

const MineSquare = ({mineSquare}: {mineSquare: GameSquare}) => {
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
    <Flex h={8} w={8} {...squareBorder} justify="center" alignItems="center">
      <Text fontWeight={700} fontColor={getFontColor(mineSquare.value)}>
        {mineSquare.isMine ? "1" : mineSquare.isHidden ? null : "0"}
      </Text>
    </Flex>
  )
}

const MineRow = ({gameRow}: {gameRow: Array<GameSquare>}) => {
  return (
    <Flex direction="column">
      {gameRow.map((square) => (
        <MineSquare
          mineSquare={square}
          key={`${square.xCoOrd}-${square.yCoOrd}`}
        />
      ))}
    </Flex>
  )
}

const MineField = ({gameState}: {gameState: GameState}) => {
  return (
    <Flex m={2}>
      {gameState.map((row, i) => {
        return <MineRow gameRow={row} key={i.toString()} />
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
  const result = []

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
        xCoOrd: i,
        yCoOrd: j,
        isHidden: true,
      })
      mineCounter++
    }
    result.push(row)
  }

  return result
}

export default function () {
  const mineCount = 45
  const gameState = createGameState(15, 15, mineCount)
  console.log(gameState)

  return (
    <Background>
      <GameHeader mineCount={mineCount} />
      <MineField gameState={gameState} />
    </Background>
  )
}
