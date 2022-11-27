import {Flex} from "@chakra-ui/react"
import {Property} from "csstype"

interface Props {
  children: React.ReactNode
  fullScreenDirection?: Property.FlexDirection
  bgColor?: string
}

const ContentContainer = ({
  children,
  fullScreenDirection = "row",
  bgColor = "white",
}: Props) => {
  return (
    <Flex
      height="100%"
      boxShadow={"lg"}
      bg="white"
      borderRadius={3}
      direction={["column", "column", fullScreenDirection]}
      justifyContent="space-around"
      p={[4, 4, 50]}
      bgColor={bgColor}
    >
      {children}
    </Flex>
  )
}

export default ContentContainer
