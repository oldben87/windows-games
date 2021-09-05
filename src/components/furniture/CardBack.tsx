import { Flex } from '@chakra-ui/react'

export const CardBack = () => {
  return (
    <Flex h="140px" w="90px" bg={'none'} borderRadius="0 0 8px 8px">
      <Flex
        h="140px"
        w="90px"
        bg="white"
        boxShadow="0 0 2px 2px rgba(0,0,0,0.2)"
        borderRadius="8px"
        p="5px"
      >
        <Flex
          h="100%"
          w="100%"
          bg={'primaryBlue'}
          borderRadius="4px"
          direction="column"
          justify="space-between"
        />
      </Flex>
    </Flex>
  )
}
