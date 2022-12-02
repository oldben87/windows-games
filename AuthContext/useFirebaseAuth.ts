import {User} from "firebase/auth"
import {useState, useEffect} from "react"
import {listenForAuthState} from "../FirebaseApi/auth"

export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const authStateChanged = async (authState: User | null) => {
    if (!authState) {
      setAuthUser(null)
      setLoading(false)
      return
    }

    setLoading(true)
    setAuthUser(authState)
    setLoading(false)
  }

  // listen for Firebase state change
  useEffect(() => {
    const unsubscribe = listenForAuthState(authStateChanged)

    return () => unsubscribe()
  }, [])

  return {
    authUser,
    loading,
  }
}
