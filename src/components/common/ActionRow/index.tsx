import {Flex, Icon, IconButton} from "@chakra-ui/react"
import {GrTrash} from "react-icons/gr"
import {HighlightRow} from "../../../../jedi-apps/Components/Common/HighlightRow"
import TextBox from "../TextBox"

interface Props {
  item: {id: string; name: string}
  onTrashClick: () => void
  onClick: () => void
  trashLoading: boolean
}

export const ActionRow = ({
  item,
  onClick,
  onTrashClick,
  trashLoading,
}: Props) => (
  <Flex key={item.id} maxWidth={400} alignItems="center">
    <IconButton
      variant={"ghost"}
      aria-label={`Remove ${item.name}`}
      icon={<Icon as={GrTrash} />}
      ml={2}
      my={1}
      size={"sm"}
      onClick={onTrashClick}
      isLoading={trashLoading}
    />
    <HighlightRow>
      <Flex h="100%" w="100%" onClick={onClick} alignItems="center">
        <TextBox>{item.name}</TextBox>
      </Flex>
    </HighlightRow>
  </Flex>
)
