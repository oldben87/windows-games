import {
  Flex,
  InputGroup,
  Input as ChakraInput,
  InputRightElement,
  Button,
} from "@chakra-ui/react"
import {ChangeEvent, FocusEvent} from "react"
import {colors} from "styles/colors"
import TextBox from "../TextBox"

type InputProps =
  | {
      title: string
      value: string | number | null
      type?: React.HTMLInputTypeAttribute
      onChange: (event: ChangeEvent<HTMLInputElement>) => void
      onBlur?: (val: FocusEvent<HTMLInputElement>) => void
      isInvalid: boolean
      maxWidth?: number
      placeholder?: string
      show?: boolean
      showHide?: () => void
    }
  | {
      title: string
      value: string | number | null
      type?: React.HTMLInputTypeAttribute
      onChange: (event: ChangeEvent<HTMLInputElement>) => void
      onBlur?: (val: FocusEvent<HTMLInputElement>) => void
      isInvalid: boolean
      maxWidth?: number
      placeholder?: string
      show: boolean
      showHide: () => void
    }

export const Input = ({
  title,
  value,
  type = "text",
  onChange,
  onBlur,
  isInvalid,
  maxWidth = 400,
  placeholder,
  showHide,
  show,
}: InputProps) => {
  return (
    <Flex direction="column" maxWidth={maxWidth} width="100%" my={2}>
      <TextBox>{title}</TextBox>
      <InputGroup>
        <ChakraInput
          value={value ? value : ""}
          type={type}
          onChange={onChange}
          errorBorderColor={colors.error}
          isInvalid={isInvalid}
          placeholder={placeholder}
          onBlur={onBlur}
        />
        {show !== undefined && showHide !== undefined && (
          <InputRightElement width="4.5rem">
            <Button type="button" h="1.75rem" size="sm" onClick={showHide}>
              {show === true ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        )}
      </InputGroup>
    </Flex>
  )
}
