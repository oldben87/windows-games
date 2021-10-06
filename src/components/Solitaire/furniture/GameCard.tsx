import { useState } from 'react'
import { Flex } from '@chakra-ui/react'
import { CardProps, SelectedCardPositionEnum } from 'types'
import { SuitIcon } from './SuitIcon'
import { CardValueRow } from './CardValueRow'

const getCardProps = (
  selectedCard: boolean,
  position: SelectedCardPositionEnum | null,
  fixPosition?: boolean,
) => {
  if (selectedCard && position === SelectedCardPositionEnum.singleCard) {
    return {
      h: '150px',
      w: '100px',
      bg: 'offOrange',
      borderRadius: '12px',
      p: '5px',
      marginLeft: fixPosition ? 0 : '-5px',
      marginTop: fixPosition ? 0 : '-5px',
      marginRight: fixPosition ? '-5px' : 0,
    }
  }

  if (position === SelectedCardPositionEnum.bottom) {
    return {
      h: '145px',
      w: '100px',
      bg: 'offOrange',
      borderRadius: '0 0 8px 8px',
      px: '5px',
      marginLeft: '-5px',
      marginTop: '0',
    }
  }

  return {
    h: '140px',
    w: '90px',
    borderRadius: '0 0 8px 8px',
    p: 0,
    marginLeft: 0,
    marginTop: 0,
  }
}

export const GameCard = ({
  card,
  faceUp,
  isFirst,
  selectedId,
  onClick,
  position,
  fixPosition,
}: CardProps) => {
  const [turnedOver, setTurnedOver] = useState(faceUp || false)
  const { suit } = card
  const cardIsSelected = selectedId === card.id.toString()

  const flexProps = getCardProps(cardIsSelected, position, fixPosition)

  return (
    <Flex
      {...flexProps}
      onClick={e => {
        e.stopPropagation()
        onClick()
      }}
    >
      <Flex
        h="140px"
        w="90px"
        bg={isFirst || cardIsSelected ? 'none' : 'white'}
        borderRadius={'0 0 8px 8px'}
      >
        <Flex
          h="140px"
          w="90px"
          bg="white"
          boxShadow={
            position === null
              ? '0 0 2px 2px rgba(0,0,0,0.2)'
              : '0 -1px 1px 1px rgba(0,0,0,0.1)'
          }
          borderRadius="8px"
          p={'5px'}
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
    </Flex>
  )
}
