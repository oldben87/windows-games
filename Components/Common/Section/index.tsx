import React from "react"
import {Box} from "@chakra-ui/react"

type Position = "TOP" | "BOTTOM" | "CENTRE"

interface Props {
  children: React.ReactNode
  underColor?: string
  bgColor?: string
  position?: Position
  pt?: Array<number>
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

const Section = ({children, bgColor, underColor, position, pt}: Props) => (
  <Box
    p={0}
    m={0}
    width="100%"
    bgColor={underColor}
    height="100%"
    flexGrow={1}
    flexBasis={1}
  >
    <Box
      width="100%"
      height="100%"
      bgColor={bgColor}
      {...getPositionBorderRadius(position)}
      overflow="hidden"
      py={[10, 10, 50]}
      px={[7, 7, 10]}
      pt={pt}
    >
      {children}
    </Box>
  </Box>
)

export default Section
