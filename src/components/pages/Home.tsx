import { Flex, Text, Image } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

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
        <Text align="center">{title}</Text>
      </Link>
    </Flex>
  )
}

export default function Home() {
  return (
    <Flex direction="column">
      <Text>Home Page</Text>
      <GameButton title="Solitaire" src="SolitaireIcon.png" link="/solitaire" />
    </Flex>
  )
}
