import React from "react"
import {Flex} from "@chakra-ui/react"

interface Props {
  children: React.ReactNode
}
export const Background = ({children}: Props) => {
  return (
    <Flex
      as="section"
      minHeight="100vh"
      minWidth="100%"
      background="primaryGreen"
      p={2}
      overflow="scroll"
    >
      {children}
    </Flex>
  )
}
