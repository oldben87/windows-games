import React from "react"
import {Box, Flex} from "@chakra-ui/react"

type Position = "TOP" | "BOTTOM" | "CENTRE"

interface Props {
  children: React.ReactNode
  underColor?: string
  bgColor?: string
  position?: Position
}

const SECTION_RADIUS = 100

const getPositionBorderRadius = (pos?: Position) => {
  switch (pos) {
    case "TOP":
      return {roundedBottomRight: SECTION_RADIUS}
    case "CENTRE":
      return {
        roundedTopLeft: SECTION_RADIUS,
        roundedBottomRight: SECTION_RADIUS,
      }
    case "BOTTOM":
      return {roundedTopLeft: SECTION_RADIUS}
    default:
      return {}
  }
}

const Section = ({children, bgColor, underColor, position}: Props) => (
  <Flex
    as={"section"}
    p={0}
    m={0}
    width="100vw"
    minHeight={[
      "calc(100vh - 150px)",
      "calc(100vh - 150px)",
      "calc(100vh - 120px)",
    ]}
    bgColor={underColor}
  >
    <Box
      height="inherit"
      w="inherit"
      bgColor={bgColor}
      {...getPositionBorderRadius(position)}
      overflow="hidden"
      py={[10, 10, 50]}
      px={[7, 7, 10]}
    >
      {children}
    </Box>
  </Flex>
)

export default Section
