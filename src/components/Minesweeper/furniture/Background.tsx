import React from "react"
import {Flex} from "@chakra-ui/react"

interface BackgroundProps {
  children: React.ReactNode
}

export const Background = ({children}: BackgroundProps) => {
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