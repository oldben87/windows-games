import React from "react"
import {Flex, Text} from "@chakra-ui/react"

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

const GameHeader = () => {
  return (
    <Flex h="100px" bgColor="grey" w="100%" p={2} justify="space-evenly">
      <Flex bgColor="black" h="100%" w="100px" justify="center">
        <Text
          color="red"
          fontWeight={600}
          fontSize={80}
          p={0}
          m={0}
          lineHeight={"100%"}
        >
          10
        </Text>
      </Flex>
    </Flex>
  )
}

const MineSquareBorder = {
  borderWidth: "2px",
  borderColorLeft: "snow",
  borderBottomColor: "black",
  borderColorTop: "snow",
  borderRightColor: "black",
}

const MineSquare = () => {
  return <Flex h={8} w={8} {...MineSquareBorder}></Flex>
}

const MineRow = () => {
  return (
    <Flex direction="column">
      <MineSquare />
      <MineSquare />
      <MineSquare />
      <MineSquare />
      <MineSquare />
      <MineSquare />
      <MineSquare />
      <MineSquare />
      <MineSquare />
      <MineSquare />
    </Flex>
  )
}

const MineField = () => {
  return (
    <Flex m={2}>
      <MineRow />
      <MineRow />
      <MineRow />
      <MineRow />
      <MineRow />
      <MineRow />
      <MineRow />
      <MineRow />
      <MineRow />
      <MineRow />
    </Flex>
  )
}

export default function () {
  return (
    <Background>
      <GameHeader />
      <MineField />
    </Background>
  )
}
