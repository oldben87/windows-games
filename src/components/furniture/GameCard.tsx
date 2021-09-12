import { useState } from 'react'
import { Flex } from '@chakra-ui/react'
import { CardProps } from 'types'
import { SuitIcon } from './SuitIcon'
import { CardValueRow } from './CardValueRow'

export const GameCard = ({
  card,
  faceUp,
  isFirst,
  selectedId,
  onClick,
}: // position,
CardProps) => {
  const [turnedOver, setTurnedOver] = useState(faceUp || false)
  const { suit } = card

  return (
    <Flex
      h="140px"
      w="90px"
      bg={isFirst ? 'none' : 'white'}
      borderRadius="0 0 8px 8px"
      onClick={e => {
        e.stopPropagation()
        onClick()
      }}
    >
      <Flex
        h="140px"
        w="90px"
        bg="white"
        boxShadow={
          selectedId === card.id.toString()
            ? '0 0 3px 3px offOrange'
            : '0 0 2px 2px rgba(0,0,0,0.2)'
        }
        borderRadius="8px"
        border={selectedId === card.id.toString() ? '4px solid' : 'none'}
        borderColor={selectedId === card.id.toString() ? 'offOrange' : 'none'}
        p={selectedId === card.id.toString() ? '1px' : '5px'}
        onClick={() => setTurnedOver(true)}
      >
        <Flex
          h="100%"
          w="100%"
          bg={turnedOver ? 'white' : 'primaryBlue'}
          borderRadius="4px"
          direction="column"
          justify="space-between"
        >
          {turnedOver && (
            <>
              <CardValueRow card={card} top={true} />
              <Flex h="50%">
                <SuitIcon suit={suit} isRed={card.isRed} />
              </Flex>
              <CardValueRow card={card} top={false} />
            </>
          )}
        </Flex>
      </Flex>
    </Flex>
  )
}
