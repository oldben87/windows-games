import { CardProps, SelectedCardPositionEnum } from 'types'
import { Flex } from '@chakra-ui/react'
import { CardValueRow } from './CardValueRow'

interface GameCardTopProps extends CardProps {
  zindex: number
}

const getCardTopProps = (
  selectedCard: boolean,
  position: SelectedCardPositionEnum | null,
) => {
  if (selectedCard && position === SelectedCardPositionEnum.top) {
    return {
      h: '35px',
      w: '100px',
      bg: 'offOrange',
      borderRadius: '8px 8px 0 0',
      p: '5px 0 0 5px',
      marginLeft: '-5px',
      marginTop: '-5px',
    }
  }

  if (position === SelectedCardPositionEnum.middle) {
    return {
      h: '30px',
      w: '100px',
      bg: 'offOrange',
      borderRadius: '0 0 0 0',
      px: '5px',
      marginLeft: '-5px',
      marginTop: '0',
    }
  }

  return {
    h: '30px',
    w: '90px',
    borderRadius: '0 0 8px 8px',
    p: 0,
    marginLeft: 0,
    marginTop: 0,
  }
}

export const GameCardTop = ({
  card,
  faceUp,
  zindex,
  isFirst,
  selectedId,
  onClick,
  position,
}: GameCardTopProps) => {
  const cardIsSelected = selectedId === card.id.toString()

  const cardTopProps = getCardTopProps(cardIsSelected, position)
  return (
    <Flex {...cardTopProps}>
      <Flex bgColor={isFirst || cardIsSelected ? 'none' : 'white'}>
        <Flex
          zindex={zindex}
          h="30px"
          w="90px"
          bg="white"
          boxShadow={
            position === null
              ? '0 0 2px 2px rgba(0,0,0,0.2)'
              : '0 -1px 1px 1px rgba(0,0,0,0.1)'
          }
          borderRadius="8px 8px 0 0"
          p="5px 5px 0 5px"
          onClick={e => {
            e.stopPropagation()
            onClick()
          }}
        >
          <Flex
            h="100%"
            w="100%"
            bg={faceUp === true ? 'white' : 'primaryBlue'}
            borderRadius="4px 4px 0 0"
            direction="column"
            justify="space-between"
          >
            {faceUp === true && (
              <>
                <CardValueRow card={card} top={true} />
              </>
            )}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}
