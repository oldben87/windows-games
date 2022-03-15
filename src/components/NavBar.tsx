import {Flex} from "@chakra-ui/react"
import {Link, useLocation} from "react-router-dom"

import "./NavBar.css"

const NavLink = ({
  title,
  link,
  selected,
}: {
  title: string
  link: string
  selected?: boolean
}) => {
  return !selected ? (
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
  ) : (
    <Flex
      className={"NavBarLink-selected"}
      border="solid 2px white"
      borderRadius={3}
      w={75}
      py={1}
      justify="center"
    >
      {title}
    </Flex>
  )
}

const Links = [
  {title: "Home", link: "/"},
  {title: "Apps", link: "/apps"},
  {title: "About", link: "/about"},
  {title: "Contact", link: "/contact"},
]

export const NavBar = () => {
  const location = useLocation()
  console.log(location)
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
          {Links.map((link) => (
            <NavLink
              title={link.title}
              link={link.link}
              selected={location.pathname === link.link}
            />
          ))}
        </Flex>
      </Flex>
    </>
  )
}
