import {User} from "firebase/auth"
import {useEffect, useState} from "react"
import {listenForAuthState} from "FirebaseApi/auth"
import Section from "../../common/Section"
import {Authentication} from "../../Auth"
import TextBox from "components/common/TextBox"
import {colors} from "styles/colors"
import {useNavigate} from "react-router-dom"

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

  const navigate = useNavigate()

  useEffect(() => {
    const cleanup = listenForAuthState((user) => {
      setState({...state, loading: false, email: null, password: null})
      setUser(user)
      if (user) {
        navigate("/auth")
      }
      setInitialLoad(false)
    })
    return () => cleanup()
  }, [])

  return (
    <Section>
      {user === null && !initialLoad && (
        <Authentication
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
