import {Text} from "@chakra-ui/react"
import {colors} from "styles/colors"
import {TextProps} from "../TextBox"

const Title = ({
  children,
  fontWeight,
  color = colors.speedle.darkestBlue,
}: TextProps) => (
  <Text fontWeight={fontWeight} fontSize={28} color={color} p={1}>
    {children}
  </Text>
)

export default Title
