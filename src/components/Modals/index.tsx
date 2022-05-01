import {
  Button,
  Modal as ChakraModal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react"

interface Props {
  onClose: () => void
  isOpen: boolean
  title: string
  loading: boolean
  children: React.ReactNode
}

export const Modal = ({onClose, isOpen, title, loading, children}: Props) => {
  return (
    <ChakraModal onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        {children}
        <ModalFooter>
          <Button isLoading={loading} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </ChakraModal>
  )
}
