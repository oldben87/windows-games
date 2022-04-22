import AuthedPage from "components/AuthedPage"
import {currentUser} from "FirebaseApi/auth"

export default function HiddenRecipes() {
  const user = currentUser()
  return (
    <AuthedPage user={user}>
      <div>Hidden stuff</div>
    </AuthedPage>
  )
}
