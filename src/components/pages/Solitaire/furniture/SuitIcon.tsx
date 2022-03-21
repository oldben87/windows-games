import {Icon} from "@chakra-ui/react"
import {GiSpades, GiClubs, GiHearts, GiDiamonds} from "react-icons/gi"
import {SuitEnum} from "components/pages/Solitaire/types"

export const getSuitToDisplay = (suit: SuitEnum) => {
  switch (suit) {
    case SuitEnum.spades:
      return {icon: GiSpades}
    case SuitEnum.clubs:
      return {icon: GiClubs}
    case SuitEnum.hearts:
      return {icon: GiHearts}
    default:
      return {icon: GiDiamonds}
  }
}

export const SuitIcon = ({suit, isRed}: {suit: SuitEnum; isRed?: boolean}) => {
  const suitToShow = getSuitToDisplay(suit)
  return (
    <Icon
      as={suitToShow.icon}
      height="100%"
      width="100%"
      color={isRed ? "red" : "black"}
    />
  )
}
