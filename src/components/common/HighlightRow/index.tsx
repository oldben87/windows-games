import {Flex} from "@chakra-ui/react"

export const HighlightRow = ({children}: {children: React.ReactNode}) => {
  return (
    <Flex
      px={2}
      borderRadius={5}
      my={1}
      boxSizing="border-box"
      border={"2px solid transparent"}
      _hover={{border: "2px solid lightgrey"}}
      height={"100%"}
      width={"100%"}
      maxWidth={400}
      alignItems="center"
      justifyContent={"space-between"}
      cursor="pointer"
    >
      {children}
    </Flex>
  )
}
