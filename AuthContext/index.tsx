import {User} from "firebase/auth"
import React, {createContext, useContext} from "react"
import useFirebaseAuth from "./useFirebaseAuth"

export interface AuthContext {
  authUser: User | null
  loading: boolean
}

const authUserContext = createContext<{
  authUser: User | null
  loading: boolean
}>({
  authUser: null,
  loading: true,
})

export function AuthUserProvider({children}: {children: React.ReactNode}) {
  const auth = useFirebaseAuth()
  return (
    <authUserContext.Provider value={auth}>{children}</authUserContext.Provider>
  )
}
// custom hook to use the authUserContext and access authUser and loading
export const useAuth = () => useContext(authUserContext)
