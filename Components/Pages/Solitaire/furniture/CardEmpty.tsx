import {Flex, Icon} from "@chakra-ui/react"
import {SuitIcon} from "."
import {GiCardDraw} from "react-icons/gi"
import {SuitEnum} from "../types"

export const CardEmpty = ({
  suit,
  onClick,
}: {
  onClick: () => void
  suit?: SuitEnum
}) => {
  return (
    <Flex
      h="140px"
      w="90px"
      bg={"none"}
      borderRadius="0 0 8px 8px"
      onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}
    >
      <Flex
        h="140px"
        w="90px"
        bg="lighterGreen"
        boxShadow="0 0 2px 2px rgba(0,0,0,0.2)"
        borderRadius="8px"
        opacity="0.3"
        p="5px"
        border="dashed 2px"
        borderColor="darkerBlue"
      >
        {suit !== undefined ? (
          <SuitIcon suit={suit} />
        ) : (
          <Icon as={GiCardDraw} height="100%" width="100%" />
        )}
      </Flex>
    </Flex>
  )
}
