import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  Flex,
} from "@chakra-ui/react"
import GameBoard from "components/pages/Solitaire/GameBoard"

interface Props {
  isOpen: boolean
  onClose: () => void
}

const windowsButtonStyle = {
  borderRadius: "none",
  borderWidth: "2px",
  borderTopColor: "lightGray",
  borderLeftColor: "lightGray",
  borderRightColor: "black",
  borderBottomColor: "black",
  bgColor: "silver",
  width: "25px",
  height: "25px",
  color: "black",
  marginBottom: "8px",
  _hover: {bg: "#C0C0C0"},
  _active: {
    borderTopColor: "black",
    borderLeftColor: "black",
    borderRightColor: "lightGray",
    borderBottomColor: "lightGray",
  },
}

export function GameBoardModal({isOpen, onClose}: Props) {
  return (
    <Modal
      isOpen={isOpen}
      size={"full"}
      onClose={onClose}
      closeOnOverlayClick={false}
    >
      <ModalContent
        borderRadius={0}
        bgColor="#C0C0C0"
        borderWidth="1px"
        borderTopColor="lightGrey"
        borderLeftColor="lightGrey"
        borderRightColor="Gray"
        borderBottomColor="Gray"
        p="1px"
        height="100%"
      >
        <ModalHeader
          fontSize="lg"
          fontWeight="bold"
          p={1}
          pl={2}
          m={0}
          borderRadius={0}
          bgColor={"blue"}
          color="white"
          borderWidth="2px"
          borderTopColor="white"
          borderLeftColor="white"
          borderRightColor="white"
          borderBottom="none"
          pr={0}
        >
          Solitaire
          <ModalCloseButton {...windowsButtonStyle} />
        </ModalHeader>
        <Flex
          borderWidth="2px"
          borderTopWidth="0px"
          borderLeftColor="white"
          borderRightColor="white"
          borderBottomColor="white"
          height="100%"
        >
          <GameBoard />
        </Flex>
      </ModalContent>
    </Modal>
  )
}
