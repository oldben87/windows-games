import {
  Button,
  Flex,
  Icon,
  ModalBody,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react"
import { logoutUser, updateUserName } from "../../../FirebaseApi/auth"
import React, { useCallback, useEffect, useState } from "react"
import { useHydrateStore } from "../../../hooks/useHydrateStore"
import { GrEdit } from "react-icons/gr"
import { Input } from "../../Common/Input"
import { Modal } from "../../Common/Modals"
import { useDispatch } from "react-redux"
import { clearRecipeLists } from "../../../Redux/slices/recipeListSlice"
import { clearRecipes } from "../../../Redux/slices/recipeSlice"
import { clearIngredients } from "../../../Redux/slices/ingredientSlice"
import Link from "next/link"
import { useRouter } from "next/router"
import { useAuth } from "../../../AuthContext"

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
}: {
  children: React.ReactNode
}) {
  const dispatch = useDispatch()

  const logout = useCallback(() => {
    dispatch(clearRecipeLists())
    dispatch(clearRecipes())
    dispatch(clearIngredients())

    return { success: true }
  }, [dispatch])

  const handleLogOut = () => {
    const loggedOut = logout()
    if (loggedOut.success) {
      logoutUser()
    }
  }

  const { onOpen, isOpen, onClose } = useDisclosure()

  const { authUser, loading: authLoading } = useAuth()

  const [userName, setUserName] = useState(authUser?.displayName || null)
  const [loadingUpdate, setLoadingUpdate] = useState(false)

  const { loading } = useHydrateStore(authUser)

  const router = useRouter()

  useEffect(() => {
    if (!authUser && !loading) {
      logout()
      router.push("/auth/login")
    }
  }, [authUser, logout, router, loading])

  if (loading || !authUser || authLoading) {
    return <Spinner size="lg" />
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
              User: {authUser?.displayName || authUser?.email}
            </Text>
          </Button>
        </Flex>
        <Link href={"/auth"}>
          <Button height={30} px={2} mr={2}>
            Receipes
          </Button>
        </Link>
        <Link href={"/auth/ingredients"}>
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

            if (!authUser) {
              return
            }

            updateUserName(authUser, userName).then(() => {
              setLoadingUpdate(false)
              onClose()
            })
          }}
        />
      </Modal>
    </>
  )
}
