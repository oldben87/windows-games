import {Button} from "@chakra-ui/react"
import {User} from "firebase/auth"
import {useEffect, useState} from "react"
import {listenForAuthState, logoutUser} from "../../Firebase"
import Section from "../common/Section"
import {Authentication} from "../Auth"
import TextBox from "components/common/TextBox"
import {colors} from "styles/colors"

export default function HiddenAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [errors, setErrors] = useState<{
    email: string | null
    password: string | null
    confirmPassword: string | null
    general: string | null
  }>({
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
      {!!user && (
        <Button isLoading={loading} onClick={handleLogOut}>
          Log Out
        </Button>
      )}
      {user === null && (
        <Authentication
          user={user}
          setUser={setUser}
          state={state}
          setState={setState}
          errors={errors}
          setErrors={setErrors}
        />
      )}
      <TextBox color={colors.error}>
        {errors.email
          ? errors.email
          : errors.password
          ? errors.password
          : errors.general
          ? errors.general
          : errors.confirmPassword
          ? errors.confirmPassword
          : null}
      </TextBox>
    </Section>
  )
}
