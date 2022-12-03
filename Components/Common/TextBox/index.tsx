import {Text} from "@chakra-ui/react"

export interface TextProps {
  children: React.ReactNode
  color?: string
  fontWeight?:
    | number
    | "bold"
    | "hairline"
    | "thin"
    | "light"
    | "normal"
    | "medium"
    | "semibold"
    | "extrabold"
    | "black"
  textAlign?: "start" | "center"
  mb?: number
  mt?: number
  ml?: number
  mr?: number
  maxWidth?: number
  fontSize?: "xs" | "sm" | "md" | "lg" | "xl"
}

const TextBox = ({children, ...rest}: TextProps) => (
  <Text my={1} {...rest}>
    {children}
  </Text>
)

export default TextBox
