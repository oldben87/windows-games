import {User} from "firebase/auth"
import {useEffect, useState} from "react"
import Section from "../../Common/Section"
import {Authentication} from "./Forms"
import TextBox from "../../Common/TextBox"
import {colors} from "../../../chakraStyles/colors"
import {useAuth} from "../../../AuthContext"
import {useRouter} from "next/router"

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

  const router = useRouter()

  const {authUser, loading} = useAuth()

  if (authUser) {
    router.push("/auth")
  }

  return (
    <Section>
      {authUser === null && !loading && (
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
