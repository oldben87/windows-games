import { useEffect, useState, useRef } from 'react'
import {
  Flex,
  Text,
  Image,
  Icon,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
} from '@chakra-ui/react'
import format from 'date-fns/format'
import { Link } from 'react-router-dom'
import { ImWindows } from 'react-icons/im'
interface GameButtonProps {
  title: string
  src: string
  link: string
}

const GameButton = ({ title, src, link }: GameButtonProps) => {
  return (
    <Flex direction="column" justify="center" maxWidth="80px" cursor="pointer">
      <Link to={link}>
        <Image src={src} h={'80px'} w={'80px'} />
        <Text align="center" color="white" mt={2}>
          {title}
        </Text>
      </Link>
    </Flex>
  )
}

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

function ErrorWindow({ isOpen, onClose }: ErrorWindowProps) {
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
            ml={4}
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

export default function Home() {
  const [date, setDate] = useState(new Date())
  const [isOpen, setIsOpen] = useState(false)
  const onErrorClose = () => setIsOpen(false)

  useEffect(() => {
    setTimeout(() => {
      setDate(new Date())
    }, 10000)
  }, [date])

  return (
    <Flex direction="column" h="100vh" bgColor="darkerBlue" justify="center">
      <GameButton title="Solitaire" src="SolitaireIcon.png" link="/solitaire" />
      <Flex
        w="100%"
        h="50px"
        p={1}
        bgColor="grey"
        borderTopWidth="2px"
        borderTopColor="lightGrey"
        position="fixed"
        bottom={0}
        justify="space-between"
      >
        <Flex
          w="110px"
          h="100%"
          p={1}
          align="center"
          justify="center"
          bgColor="grey"
          borderWidth="2px"
          borderTopColor="lightGrey"
          borderLeftColor="lightGrey"
          borderRightColor="black"
          borderBottomColor="black"
          cursor="pointer"
          onClick={() => setIsOpen(true)}
        >
          <Icon as={ImWindows} height="90%" width="40%" color="black" />
          <Text color="black" letterSpacing="1.3px" fontWeight={600}>
            Start
          </Text>
        </Flex>
        <Flex
          justify="center"
          align="center"
          borderWidth="1px"
          borderTopColor="black"
          borderLeftColor="black"
          borderRightColor="lightGrey"
          borderBottomColor="lightGrey"
          px={3}
        >
          <Text color="black">{format(date, 'hh:mm a')}</Text>
        </Flex>
      </Flex>

      <ErrorWindow isOpen={isOpen} onClose={onErrorClose} />
    </Flex>
  )
}
