import {Button, Flex} from "@chakra-ui/react"
import {logoutUser} from "FirebaseApi/auth"
import {Navigate} from "react-router-dom"
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
      <Flex
        justifyContent={"flex-end"}
        position={"absolute"}
        top={"15px"}
        zIndex={50}
        right={5}
      >
        <Button isLoading={loading} onClick={handleLogOut}>
          Log Out
        </Button>
      </Flex>
      {children}
    </>
  )
}
