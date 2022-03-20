import {Text} from "@chakra-ui/react"
import {TextProps} from "../TextBox"

const Title = ({children, fontWeight, color}: TextProps) => (
  <Text fontWeight={fontWeight} fontSize={28} color={color} py={1}>
    {children}
  </Text>
)

export default Title
