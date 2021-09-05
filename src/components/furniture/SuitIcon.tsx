import { Icon } from '@chakra-ui/react'
import { GiSpades, GiClubs, GiHearts, GiDiamonds } from 'react-icons/gi'
import { SuitEnum } from 'types'

export const getSuitToDisplay = (suit: SuitEnum) => {
  if (suit === SuitEnum.spades) {
    return { icon: GiSpades }
  }
  if (suit === SuitEnum.clubs) {
    return { icon: GiClubs }
  }
  if (suit === SuitEnum.hearts) {
    return { icon: GiHearts }
  }
  return { icon: GiDiamonds }
}

export const SuitIcon = ({
  suit,
  isRed,
}: {
  suit: SuitEnum
  isRed: boolean
}) => {
  const suitToShow = getSuitToDisplay(suit)
  return (
    <Icon
      as={suitToShow.icon}
      height="100%"
      width="100%"
      color={isRed ? 'red' : 'black'}
    />
  )
}
