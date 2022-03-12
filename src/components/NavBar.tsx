import {Flex, Image} from "@chakra-ui/react"
import {Link} from "react-router-dom"

export const NavBar = () => {
  return (
    <Flex
      w="100%"
      h="70px"
      bg="black"
      dir="row"
      p="4px"
      color="white"
      fontFamily="Noto Sans"
    >
      <Link to={"/"}>
        <Image src="./Logo.png" height="100%" />
      </Link>
      <Link to={"/about"}>About</Link>
      <Link to={"/apps"}>Apps</Link>
      <Link to={"/contact"}>Contact</Link>
    </Flex>
  )
}
