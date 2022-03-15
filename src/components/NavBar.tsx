import {Flex} from "@chakra-ui/react"
import {Link} from "react-router-dom"

import "./NavBar.css"

const NavLink = ({title, link}: {title: string; link: string}) => (
  <Link to={link}>
    <Flex
      className={"NavBarLink"}
      border="solid 2px white"
      borderRadius={3}
      w={75}
      py={1}
      justify="center"
    >
      {title}
    </Flex>
  </Link>
)

export const NavBar = () => {
  return (
    <>
      <Flex
        w="100%"
        bg="#222222"
        h={70}
        dir="row"
        p="4px"
        color="white"
        fontFamily="Noto Sans"
        justify="center"
        alignItems="center"
      >
        <Flex width={[320]} justify="space-between">
          <NavLink link="/" title="Home" />
          <NavLink link="/apps" title="Apps" />
          <NavLink link="/about" title="About" />
          <NavLink link="/contact" title="Contact" />
        </Flex>
      </Flex>
    </>
  )
}
