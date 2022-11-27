import { Text } from '@chakra-ui/react'

interface Props {
  title: string
}

export const PageTitle = ({ title }: Props) => (
  <Text
    fontSize="3xl"
    color="white"
    letterSpacing="3px"
    fontWeight="bold"
    textAlign="center"
  >
    {title}
  </Text>
)
