import {useState} from "react"
import {
  Flex,
  Image,
  Drawer,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  DrawerFooter,
  Button,
} from "@chakra-ui/react"
import {GiHamburgerMenu} from "react-icons/gi"
import {Link} from "react-router-dom"

export const NavBar = () => {
  const [isOpen, setIsOpen] = useState(true)

  const handleClose = () => {
    setIsOpen(false)
  }
  return (
    <>
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
        <Button>
          <GiHamburgerMenu />
        </Button>
      </Flex>
      <Drawer isOpen={isOpen} placement="left" onClose={handleClose}>
        <DrawerContent>
          <DrawerCloseButton />

          <DrawerBody>
            <Link to={"/about"}>About</Link>
            <Link to={"/apps"}>Apps</Link>
            <Link to={"/contact"}>Contact</Link>{" "}
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={() => {}}>
              Cancel
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}
