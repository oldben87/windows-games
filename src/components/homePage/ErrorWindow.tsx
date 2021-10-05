import { useRef } from 'react'

import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
} from '@chakra-ui/react'

const windowsButtonStyle = {
  borderRadius: 'none',
  borderWidth: '2px',
  borderTopColor: 'lightGray',
  borderLeftColor: 'lightGray',
  borderRightColor: 'black',
  borderBottomColor: 'black',
  bgColor: 'silver',
  width: '150px',
}

interface ErrorWindowProps {
  isOpen: boolean
  onClose: () => void
}

export function ErrorWindow({ isOpen, onClose }: ErrorWindowProps) {
  const cancelRef = useRef(null)

  return (
    <AlertDialog
      isOpen={isOpen}
      onClose={onClose}
      leastDestructiveRef={cancelRef}
    >
      <AlertDialogOverlay>
        <AlertDialogContent
          borderRadius={0}
          bgColor="#C0C0C0"
          borderWidth="2px"
          borderTopColor="lightGrey"
          borderLeftColor="lightGrey"
          borderRightColor="Gray"
          borderBottomColor="Gray"
        >
          <AlertDialogHeader
            fontSize="lg"
            fontWeight="bold"
            p={1}
            pl={2}
            m={0}
            borderRadius={0}
            bgColor={'blue'}
            color="white"
            borderWidth="2px"
            borderTopColor="white"
            borderLeftColor="white"
            borderRightColor="white"
            borderBottom="none"
          >
            Error error?
          </AlertDialogHeader>

          <AlertDialogBody>
            Maybe an error occured, we are unsure, try again?
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button {...windowsButtonStyle} onClick={onClose} ml={3}>
              Erm, OK?
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}
