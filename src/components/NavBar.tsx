import {Flex, Image} from "@chakra-ui/react"
import {Link} from "react-router-dom"

export const NavBar = () => {
  return (
    <Flex w="100%" h="70px" bg="#222222" dir="row">
      <Link to={"/"}>
        <Image src="./Logo.png" height="100%" />
      </Link>
    </Flex>
  )
}
