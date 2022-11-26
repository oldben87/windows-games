import {
  Button,
  Flex,
  Icon,
  ModalBody,
  Text,
  useDisclosure,
} from "@chakra-ui/react"
import {logoutUser, updateUserName} from "FirebaseApi/auth"
import {Link, Navigate} from "react-router-dom"
import React, {useState} from "react"
import {User} from "firebase/auth"
import {useHydrateStore} from "hooks/useHydrateStore"
import {GrEdit} from "react-icons/gr"
import {Input} from "components/common/Input"
import {Modal} from "components/Modals"
import {useDispatch} from "react-redux"
import {clearRecipeLists} from "Redux/slices/recipeListSlice"
import {clearRecipes} from "Redux/slices/recipeSlice"
import {clearIngredients} from "Redux/slices/ingredientSlice"

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

export default function AuthedPage({
  children,
  user,
}: {
  children: React.ReactNode
  user: User | null
}) {
  const dispatch = useDispatch()

  const useLogout = () => {
    dispatch(clearRecipeLists())
    dispatch(clearRecipes())
    dispatch(clearIngredients())

    return {success: true}
  }

  const handleLogOut = () => {
    const loggedOut = useLogout()
    if (loggedOut.success) {
      logoutUser()
    }
  }

  const {onOpen, isOpen, onClose} = useDisclosure()

  const [userName, setUserName] = useState(user?.displayName || null)
  const [loadingUpdate, setLoadingUpdate] = useState(false)

  const {loading} = useHydrateStore(user)

  if (!user) {
    useLogout()
    return <Navigate to="/auth/login" />
  }

  return (
    <>
      <Flex
        justify={"center"}
        position={"fixed"}
        left={0}
        right={0}
        top={[120, 120, 70]}
        bgColor={"white"}
        zIndex={2}
      >
        <Flex alignItems="center" display={["none", "block"]}>
          <Button
            textAlign="center"
            variant={"ghost"}
            aria-label="Update user name"
            onClick={onOpen}
            rightIcon={<Icon as={GrEdit} />}
            height={30}
            px={2}
            mr={2}
          >
            <Text noOfLines={1} maxWidth={150}>
              User: {user?.displayName || user?.email}
            </Text>
          </Button>
        </Flex>
        <Link to={"/auth"}>
          <Button height={30} px={2} mr={2}>
            Receipes
          </Button>
        </Link>
        <Link to={"/auth/ingredients"}>
          <Button height={30} px={2} mr={2}>
            Ingredients
          </Button>
        </Link>
        <Button height={30} isLoading={loading} onClick={handleLogOut}>
          Log Out
        </Button>
      </Flex>
      <Flex mt={30}>{children}</Flex>
      <Modal
        onClose={onClose}
        isOpen={isOpen}
        title={"Set display name"}
        loading={loadingUpdate}
      >
        <UserNameModalContent
          userName={userName}
          onChange={(event) => setUserName(event.target.value)}
          onClick={async () => {
            setLoadingUpdate(true)
            if (!userName || userName.length === 0) {
              return
            }

            if (!user) {
              return
            }

            updateUserName(user, userName).then(() => {
              setLoadingUpdate(false)
              onClose()
            })
          }}
        />
      </Modal>
    </>
  )
}
