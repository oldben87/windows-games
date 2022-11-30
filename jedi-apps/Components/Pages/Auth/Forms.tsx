import {Button, Flex} from "@chakra-ui/react"
import {useState} from "react"
import {signUpUser, logInUser, passwordReset} from "../../../FirebaseApi/auth"
import {Input} from "../../Common/Input"

interface FormState {
  loading: boolean
  email: string | null
  password: string | null
  confirmPassword: string | null
}

interface ErrorState {
  email: string | null
  password: string | null
  general: string | null
  confirmPassword: string | null
}

type FormPage = "signup" | "signin" | "reset"

const getButtonText = (page: FormPage) => {
  if (page === "reset") {
    return "Send reset email"
  }

  if (page === "signin") {
    return "Log me in"
  }

  return "Sign me up"
}

export const Authentication = ({
  state,
  setState,
  errors,
  setErrors,
}: {
  state: FormState
  setState: (state: FormState) => void
  errors: ErrorState
  setErrors: (errors: ErrorState) => void
}) => {
  const [show, setShow] = useState(false)
  const [formPage, setFormPage] = useState<FormPage>("signin")

  const {email, password, loading, confirmPassword} = state

  const handleSignUp = async () => {
    setState({...state, email, loading: true})

    if (!email || email.length === 0) {
      setErrors({...errors, email: "No email entered"})
      setState({...state, loading: false})

      return
    }

    if (!password || password.length === 0) {
      setErrors({...errors, password: "No password entered"})
      setState({...state, loading: false})

      return
    }

    if (!confirmPassword || confirmPassword.length === 0) {
      setErrors({...errors, confirmPassword: "Please confirm password"})
      setState({...state, loading: false})

      return
    }

    if (password !== confirmPassword) {
      setErrors({...errors, confirmPassword: "Passwords do no match"})
      setState({...state, loading: false})

      return
    }

    try {
      signUpUser(email, password)
        .then(() => {
          setState({...state, loading: false, email: null, password: null})
        })
        .catch(() => {
          setState({...state, loading: false})
          setError("Failed to sign up as new user")
        })
    } catch {
      setState({...state, loading: false})
      setError("Sign up Failed")
    }
  }

  const setError = (value: string | null) => {
    setErrors({...errors, general: value})
  }

  const clearErrors = () => {
    setErrors({
      email: null,
      password: null,
      general: null,
      confirmPassword: null,
    })
  }

  const handlePasswordReset = async () => {
    setState({...state, loading: true})
    try {
      if (!email || email.length === 0) {
        setErrors({...errors, email: "No email entered"})
        setState({...state, loading: false})
        return
      }
      passwordReset(email).then((result) => {
        if ("success" in result) {
          setFormPage("signin")
        } else {
          setError(result.message)
        }
        setState({...state, loading: false})
      })
    } catch {
      setError("Login failed")
      setState({...state, loading: false})
    }
  }

  const handleLogIn = async () => {
    setState({...state, loading: true})
    try {
      if (!email || email.length === 0) {
        setState({
          ...state,
          loading: false,
        })
        setErrors({...errors, email: "No email entered"})

        return
      }

      if (!password || password.length === 0) {
        setState({
          ...state,
          loading: false,
        })
        setErrors({...errors, password: "No password entered"})

        return
      }

      logInUser(email, password).catch(() => {
        setError("Login failed, invalid email or password")
        setState({...state, loading: false})
      })
    } catch (error) {
      setError("Failed to log in")
      setState({...state, loading: false})
    }
  }

  const handleButtonClick = async () => {
    if (formPage === "reset") {
      await handlePasswordReset()
      return
    }

    if (formPage === "signin") {
      await handleLogIn()
      return
    }

    await handleSignUp()
    return
  }

  const isLogin = formPage === "signin"
  const isReset = formPage === "reset"

  return (
    <Flex direction={"column"}>
      <Input
        title="Email"
        placeholder="your@email.com"
        value={email}
        onChange={(event) => {
          setState({
            ...state,
            email: event.target.value,
          })
          clearErrors()
        }}
        isInvalid={!!errors.email}
      />
      {!isReset && (
        <Input
          title="Password"
          placeholder="Choose a password"
          value={password}
          onChange={(event) => {
            setState({
              ...state,
              password: event.target.value,
            })
            clearErrors()
          }}
          isInvalid={!!errors.password}
          show={show}
          showHide={() => setShow(!show)}
          type={show ? "text" : "password"}
        />
      )}
      {formPage === "signup" && (
        <Input
          title="Confirm password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(event) => {
            setState({
              ...state,
              confirmPassword: event.target.value,
            })
            clearErrors()
          }}
          type={show ? "text" : "password"}
          isInvalid={!!errors.confirmPassword}
          show={show}
          showHide={() => setShow(!show)}
        />
      )}
      <Flex direction="column" maxWidth={400} mt={4}>
        <Button
          mb={4}
          onClick={handleButtonClick}
          isLoading={loading}
          disabled={!!errors.email || !!errors.password || loading}
        >
          {getButtonText(formPage)}
        </Button>
        {!isReset && (
          <>
            <Button
              variant="link"
              onClick={() => setFormPage(isLogin ? "signup" : "signin")}
              mt={4}
            >
              {isLogin
                ? "Don't have an account? Sign Up"
                : "Already a user? Sign In"}
            </Button>
          </>
        )}
        <Button
          variant="link"
          onClick={() => setFormPage(formPage !== "reset" ? "reset" : "signin")}
          my={4}
        >
          {!isReset
            ? "Forgot your password? Get a new one!"
            : "Back to sign in"}
        </Button>
      </Flex>
    </Flex>
  )
}
