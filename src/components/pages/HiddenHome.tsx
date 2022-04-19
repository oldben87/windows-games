import {
  Button,
  Flex,
  IconButton,
  ModalBody,
  useDisclosure,
  Icon,
} from "@chakra-ui/react"
import {logoutUser, currentUser, updateUserName} from "FirebaseApi/auth"
import {Navigate} from "react-router-dom"
import Section from "components/common/Section"
import TextBox from "components/common/TextBox"
import {Input} from "components/common/Input"
import React, {useState} from "react"
import {Modal} from "components/Modals"
import {GrEdit} from "react-icons/gr"

interface UserNameModalContent {
  userName: string | null
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onClick: () => Promise<void>
}

const UserNameModalContent = ({
  userName,
  onChange,
  onClick,
}: UserNameModalContent) => {
  return (
    <ModalBody>
      <Input
        title={"User name"}
        value={userName}
        onChange={onChange}
        placeholder="User name"
        isInvalid={false}
      />
      <Button onClick={onClick}>Update</Button>
    </ModalBody>
  )
}

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
        <Flex alignItems="center">
          <TextBox textAlign="center">
            User: {user.displayName || user.email}
          </TextBox>
          <IconButton
            variant={"ghost"}
            aria-label="Update user name"
            onClick={onOpen}
            icon={<Icon as={GrEdit} />}
          >
            Update user name
          </IconButton>
        </Flex>
      </Section>
      <Modal
        onClose={onClose}
        isOpen={isOpen}
        title={"Set display name"}
        loading={loading}
      >
        <UserNameModalContent
          userName={userName}
          onChange={(event) => setUserName(event.target.value)}
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
        />
      </Modal>
    </>
  )
}
