import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react"
import {logoutUser, currentUser, updateUserName} from "../../firebase"
import {Navigate} from "react-router-dom"
import Section from "components/common/Section"
import TextBox from "components/common/TextBox"
import {Input} from "components/common/Input"
import {useState} from "react"

export default function HiddenHome() {
  const {isOpen, onOpen, onClose} = useDisclosure()

  const user = currentUser()
  const [userName, setUserName] = useState(user?.displayName || null)
  const [loading, setLoading] = useState(false)

  const handleLogOut = () => {
    logoutUser()
  }

  if (!user) {
    return <Navigate to="/hidden/auth" />
  }

  return (
    <>
      <Flex
        justifyContent={"flex-end"}
        position={"absolute"}
        top={"15px"}
        zIndex={50}
        right={5}
      >
        <Button onClick={handleLogOut}>Log Out</Button>
      </Flex>
      <Section>
        <Flex justifyContent={"space-between"}>
          <TextBox>User: {user.displayName || user.email}</TextBox>
          <Button onClick={onOpen}>Update display name</Button>
        </Flex>
      </Section>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Set display name</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              title={"Display name"}
              value={userName}
              onChange={(event) => setUserName(event.target.value)}
              placeholder="Display name"
              isInvalid={false}
            />
            <Button
              onClick={async () => {
                setLoading(true)
                if (!userName || userName.length === 0) {
                  return
                }
                updateUserName(user, userName).then(() => {
                  setLoading(false)
                  onClose()
                })
              }}
            >
              Update
            </Button>
          </ModalBody>
          <ModalFooter>
            <Button isLoading={loading} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
