import { Flex, Text } from '@chakra-ui/react'
import { getValueForDisplay } from 'helpers'
import { CardInfo } from 'types'
import { SuitIcon } from './SuitIcon'

export const CardValueRow = ({
  card,
  top,
}: {
  card: CardInfo
  top: boolean
}) => {
  const { value, suit, isRed } = card
  const valueToDisplay = getValueForDisplay(value)

  return (
    <Flex justify={top ? 'flex-start' : 'flex-end'}>
      <Flex alignItems="center" direction={top ? 'row' : 'row-reverse'}>
        <Text ml={top ? 0 : '2px'} transform={!top ? 'rotate(180deg)' : 'none'}>
          {valueToDisplay}
        </Text>
        <Flex
          h="16px"
          w="16px"
          ml={top ? '2px' : 0}
          transform={!top ? 'rotate(180deg)' : 'none'}
        >
          <SuitIcon suit={suit} isRed={isRed} />
        </Flex>
      </Flex>
    </Flex>
  )
}
