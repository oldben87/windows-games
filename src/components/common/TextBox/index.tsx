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
}

const TextBox = ({children}: TextProps) => <Text my={1}>{children}</Text>

export default TextBox
