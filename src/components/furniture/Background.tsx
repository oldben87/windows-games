import React from 'react'
import { Flex } from '@chakra-ui/react'

interface Props {
  children: React.ReactNode
}
export const Background = ({ children }: Props) => {
  return (
    <Flex as="section" h="100vh" w="100vw" background="primaryGreen">
      {children}
    </Flex>
  )
}
