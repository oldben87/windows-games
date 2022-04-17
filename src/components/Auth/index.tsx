import {Button, Flex} from "@chakra-ui/react"
import {User} from "firebase/auth"
import {useEffect, useState} from "react"
import {signUpUser, listenForAuthState, logInUser} from "../../Firebase"
import Section from "../common/Section"
import {Input} from "../common/Input"

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

export const Authentication = ({
  user,
  setUser,
  state,
  setState,
  errors,
  setErrors,
}: {
  user: User | null
  setUser: (user: User | null) => void
  state: FormState
  setState: (state: FormState) => void
  errors: ErrorState
  setErrors: (errors: ErrorState) => void
}) => {
  const [show, setShow] = useState(false)
  const [login, setLogin] = useState(true)

  const {email, password, loading, confirmPassword} = state

  useEffect(() => {
    listenForAuthState((user) => {
      setState({...state, loading: false, email: null, password: null})
      setUser(user)
    })
  }, [])

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
        .then((user) => {
          setState({...state, loading: false, email: null, password: null})
          setUser(user.user)
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

      logInUser(email, password)
        .then((result) => {
          setUser(result.user)
        })
        .catch(() => {
          setError("Login failed, invalid email or password")
        })
        .finally(() => setState({...state, loading: false}))
    } catch (error) {
      setError("Failed to log in")
      setState({...state, loading: false})
    }
  }

  return (
    <Section>
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
        {!login && (
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
        <Flex direction="column" maxWidth={400} my={8}>
          <Button
            mb={4}
            onClick={login ? handleLogIn : handleSignUp}
            isLoading={loading}
            disabled={!!errors.email || !!errors.password || loading}
          >
            {login ? "Sign in" : "Sign up"}
          </Button>
          {user === null && (
            <Button variant="link" onClick={() => setLogin(!login)}>
              {login
                ? "Don't have an account? Sign Up"
                : "Already a user? Sign In"}
            </Button>
          )}
        </Flex>
      </Flex>
    </Section>
  )
}
