import {Flex, Image} from "@chakra-ui/react"
import Link from "next/link"
import {useRouter} from "next/router"
import {colors} from "../../../chakraStyles/colors"
import styles from "./NavBar.module.css"

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
    <Link href={link}>
      <Flex
        className={styles.NavBarLink}
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
      className={styles.NavBarLink_selected}
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
  const router = useRouter()

  return (
    <Flex
      as={"nav"}
      w="100%"
      bg={colors.speedle.darkestBlue}
      h={[120, 120, 70]}
      flexDirection={["column", "column", "row"]}
      color="white"
      fontFamily="Noto Sans"
      alignItems={["center"]}
      justifyContent={["center"]}
      position="fixed"
      zIndex={3}
      shadow="0 1px 5px 2px rgba(0,0,0,0.4)"
    >
      <Image
        height={[70, 70, "100%"]}
        mx={1}
        src="/Website-Nav-Logo.png"
        position="absolute"
        top={0}
        left={["calc(50%-70px)", "calc(50%-70px)", 5]}
        alt={"Logo"}
      />
      <Flex
        width={[320]}
        mt={["60px", "60px", 0]}
        justify="space-between"
        alignItems={"center"}
      >
        {Links.map((link) => (
          <NavLink
            key={link.title}
            title={link.title}
            link={link.link}
            selected={router.pathname === link.link}
          />
        ))}
      </Flex>
    </Flex>
  )
}
