import {Flex, Image} from "@chakra-ui/react"
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
    <Flex
      as={"nav"}
      w="100%"
      bg="#222222"
      h={[120, 120, 70]}
      flexDirection={["column", "column", "row"]}
      color="white"
      fontFamily="Noto Sans"
      alignItems={["center"]}
      justifyContent={["center"]}
      position="relative"
    >
      <Image
        height={[70, 70, "100%"]}
        mx={1}
        src="/Jedi-Apps-Logo(150x75).png"
        position="absolute"
        top={0}
        left={["calc(50%-70px)", "calc(50%-70px)", 5]}
      />
      <Flex
        width={[320]}
        mt={["60px", "60px", 0]}
        justify="space-between"
        alignItems={"center"}
      >
        {Links.map((link) => (
          <NavLink
            title={link.title}
            link={link.link}
            selected={location.pathname === link.link}
          />
        ))}
      </Flex>
    </Flex>
  )
}