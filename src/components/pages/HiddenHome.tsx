import {
  Button,
  Flex,
  IconButton,
  ModalBody,
  useDisclosure,
  Icon,
} from "@chakra-ui/react"
import {logoutUser, currentUser, updateUserName} from "FirebaseApi/auth"
import Section from "components/common/Section"
import TextBox from "components/common/TextBox"
import {Input} from "components/common/Input"
import React, {useState} from "react"
import {Modal} from "components/Modals"
import {GrEdit, GrAdd} from "react-icons/gr"
import AuthedPage from "components/AuthedPage"
import {Link} from "react-router-dom"
import {recipes} from "FirebaseApi/database"

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

  return (
    <AuthedPage user={user}>
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
              User: {user?.displayName || user?.email}
            </TextBox>
            <IconButton
              variant={"ghost"}
              aria-label="Update user name"
              onClick={onOpen}
              icon={<Icon as={GrEdit} />}
              ml={2}
            >
              Update user name
            </IconButton>
          </Flex>
          <Flex alignItems={"center"}>
            Recipes:
            <Link to={"/hidden/recipe"}>
              <IconButton
                variant={"ghost"}
                aria-label="Add new recipe"
                icon={<Icon as={GrAdd} />}
                ml={2}
              >
                New Recipes
              </IconButton>
            </Link>
          </Flex>
          <Flex>
            {Object.entries(recipes).map(([id, recipe]) => {
              return <p key={id}>{recipe.name}</p>
            })}
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

              if (!user) {
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
    </AuthedPage>
  )
}
