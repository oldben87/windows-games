import {Button, Flex, Text} from "@chakra-ui/react"
import {GameVariables} from "../types"

export const GameHeader = ({
  gameVariables,
  openNewGameModal,
}: {
  gameVariables: GameVariables
  openNewGameModal: () => void
}) => {
  return (
    <Flex h="100px" bgColor="grey" w="100%" p={2} justify="space-evenly">
      <Flex direction="column" alignItems="center" w="110px">
        <Text>Mine Total:</Text>
        <Text>{gameVariables.mineCount}</Text>
      </Flex>
      <Flex
        bgColor="black"
        w="110px"
        justify="center"
        alignItems="center"
        px={2}
        boxSizing="border-box"
        color="red"
        fontWeight={600}
        fontSize={65}
        p={0}
        m={0}
      >
        {gameVariables.hasWon ? "Yay" : gameVariables.flagsRemaining}
      </Flex>
      <Flex w="110px">
        <Button onClick={openNewGameModal}>New Game</Button>
      </Flex>
    </Flex>
  )
}
