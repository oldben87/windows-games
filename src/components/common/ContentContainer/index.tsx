import {Flex} from "@chakra-ui/react"
import {Property} from "csstype"

interface Props {
  children: React.ReactNode
  fullScreenDirection?: Property.FlexDirection
}

const ContentContainer = ({children, fullScreenDirection = "row"}: Props) => {
  return (
    <Flex
      height="100%"
      boxShadow={"lg"}
      bg="white"
      borderRadius={3}
      direction={["column", "column", fullScreenDirection]}
      justifyContent="space-around"
      p={[4, 4, 50]}
    >
      {children}
    </Flex>
  )
}

export default ContentContainer
