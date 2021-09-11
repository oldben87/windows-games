import { CardProps } from 'types'
import { Flex } from '@chakra-ui/react'
import { CardValueRow } from './CardValueRow'

interface GameCardTopProps extends CardProps {
  zindex: number
}

export const GameCardTop = ({
  card,
  faceUp,
  zindex,
  isFirst,
  selectedId,
}: GameCardTopProps) => {
  return (
    <>
      <Flex h="30px" w="90px" bgColor={isFirst ? 'none' : 'white'}>
        <Flex
          zindex={zindex}
          h="30px"
          w="90px"
          bg="white"
          bordercolor={
            selectedId === card.id.toString() ? 'lighterGreen' : 'none'
          }
          borderWidth={selectedId === card.id.toString() ? '2' : 0}
          borderStyle={'solid'}
          boxShadow="0 0 2px 2px rgba(0,0,0,0.2)"
          borderRadius="8px 8px 0 0"
          p="5px 5px 0 5px"
          onClick={e => {
            e.stopPropagation()
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
    </>
  )
}
