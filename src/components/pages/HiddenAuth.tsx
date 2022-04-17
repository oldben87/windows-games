import {Button, Spinner} from "@chakra-ui/react"
import {User} from "firebase/auth"
import {useEffect, useState} from "react"
import {listenForAuthState, logoutUser} from "../../Firebase"
import Section from "../common/Section"
import {Authentication} from "../Auth"
import TextBox from "components/common/TextBox"
import {colors} from "styles/colors"

interface Errors {
  email: string | null
  password: string | null
  confirmPassword: string | null
  general: string | null
}

const displayError = (errors: Errors) => {
  return (
    errors.email || errors.general || errors.confirmPassword || errors.password
  )
}

export default function HiddenAuth() {
  const [initialLoad, setInitialLoad] = useState(true)
  const [user, setUser] = useState<User | null>(null)
  const [errors, setErrors] = useState<Errors>({
    email: null,
    password: null,
    confirmPassword: null,
    general: null,
  })

  const [state, setState] = useState<{
    loading: boolean
    email: string | null
    password: string | null
    confirmPassword: string | null
  }>({
    loading: false,
    email: null,
    password: null,
    confirmPassword: null,
  })
  const {loading} = state

  useEffect(() => {
    const cleanup = listenForAuthState((user) => {
      setState({...state, loading: false, email: null, password: null})
      setUser(user)
      setInitialLoad(false)
    })
    return () => cleanup()
  }, [])

  const handleLogOut = () => {
    setState({...state, loading: true})

    logoutUser().catch(() => {
      setState({...state, loading: false, email: null, password: null})
      setUser(null)
    })
  }

  return (
    <Section>
      {initialLoad && <Spinner />}
      {!!user && (
        <Button isLoading={loading} onClick={handleLogOut}>
          Log Out
        </Button>
      )}
      {user === null && !initialLoad && (
        <Authentication
          user={user}
          setUser={setUser}
          state={state}
          setState={setState}
          errors={errors}
          setErrors={setErrors}
        />
      )}
      <TextBox color={colors.error}>{displayError(errors)}</TextBox>
    </Section>
  )
}
