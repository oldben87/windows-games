import {Flex, Text} from "@chakra-ui/react"

export const GameHeader = ({mineCount}: {mineCount: number}) => {
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
