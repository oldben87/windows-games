import {Button, Flex} from "@chakra-ui/react"
import {logoutUser} from "FirebaseApi/auth"
import {Link, Navigate} from "react-router-dom"
import React from "react"
import {User} from "firebase/auth"
import {useHydrateStore} from "hooks/useHydrateStore"

export default function AuthedPage({
  children,
  user,
}: {
  children: React.ReactNode
  user: User | null
}) {
  const handleLogOut = () => {
    logoutUser()
  }

  const {loading} = useHydrateStore(user)

  if (!user) {
    return <Navigate to="/hidden/auth" />
  }

  return (
    <>
      <Flex justify={"center"}>
        <Link to={"/hidden"}>
          <Button height={30} px={2} mr={2}>
            Receipes
          </Button>
        </Link>
        <Link to={"/hidden/ingredients"}>
          <Button height={30} px={2} mr={2}>
            Ingredients
          </Button>
        </Link>
        <Button height={30} isLoading={loading} onClick={handleLogOut}>
          Log Out
        </Button>
      </Flex>
      {children}
    </>
  )
}
