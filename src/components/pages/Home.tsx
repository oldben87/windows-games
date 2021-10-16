import {useEffect, useState} from "react"
import {Link} from "react-router-dom"
import {Flex, Text, Image, Icon} from "@chakra-ui/react"
import format from "date-fns/format"
import {ImWindows} from "react-icons/im"
import {ErrorWindow} from "../homePage/ErrorWindow"

interface GameButtonProps {
  title: string
  src: string
  link: string
}

const GameButton = ({title, src, link}: GameButtonProps) => {
  return (
    <Link to={link}>
      <Flex
        direction="column"
        justify="center"
        maxWidth="80px"
        cursor="pointer"
      >
        <Image src={src} h={"80px"} w={"80px"} />
        <Text align="center" color="white" mt={2}>
          {title}
        </Text>
      </Flex>
    </Link>
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
      <GameButton title="Solitaire" src="SolitaireIcon.png" link="/solitiare" />
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
          <Text color="black">{format(date, "hh:mm a")}</Text>
        </Flex>
      </Flex>
      <ErrorWindow isOpen={isOpen} onClose={onErrorClose} />
    </Flex>
  )
}
