import {Button} from "@chakra-ui/react"
import {logoutUser, currentUser} from "../../firebase"
import {Navigate} from "react-router-dom"

export default function HiddenHome() {
  const user = currentUser()

  const handleLogOut = () => {
    logoutUser()
  }

  if (!user) {
    return <Navigate to="/hidden/auth" />
  }

  return <Button onClick={handleLogOut}>Log Out</Button>
}
