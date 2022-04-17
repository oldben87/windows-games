import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react"
import TextBox from "components/common/TextBox"
import {User} from "firebase/auth"
import {useEffect, useState} from "react"
import {colors} from "styles/colors"
import {
  signUpUser,
  listenForAuthState,
  logoutUser,
  logInUser,
} from "../../Firebase"
import Section from "../common/Section"

export default function HiddenAuth() {
  const [show, setShow] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [errors, setErrors] = useState<{
    email: string | null
    password: string | null
    general: string | null
  }>({
    email: null,
    password: null,
    general: null,
  })

  const [state, setState] = useState<{
    loading: boolean
    email: string | null
    password: string | null
  }>({
    loading: false,
    email: null,
    password: null,
  })
  const {email, password, loading} = state

  useEffect(() => {
    listenForAuthState((user) => {
      setState({...state, loading: false, email: null, password: null})
      setUser(user)
    })
  }, [])

  const handleButtonClick = async () => {
    setState({...state, email, loading: true})
    if (user) {
      logoutUser().catch(() => {
        setState({...state, loading: false, email: null, password: null})
        setUser(null)
      })
    } else {
      try {
        signUpUser("ben@jedi-apps.co.uk", "Password123")
          .then((user) => {
            setState({...state, loading: false, email: null})
            setUser(user.user)
          })
          .catch(() => {
            setState({...state, loading: false, email: null})
            setError("Signup Failed")
          })
      } catch {
        setState({...state, loading: false, email: null})
        setError("Sign up Failed")
      }
    }
  }

  const setError = (value: string | null) => {
    setErrors({...errors, general: value})
  }

  const clearErrors = () => {
    setErrors({email: null, password: null, general: null})
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
      {user ? user.email + " " : loading ? "Loading ... " : "Not found "}
      <Button isLoading={loading} onClick={handleButtonClick}>
        {user ? "Log Out" : "Create User"}
      </Button>
      <Flex direction="column" maxWidth={400} my={3}>
        <TextBox>Email</TextBox>
        <InputGroup>
          <Input
            value={email ? email : ""}
            errorBorderColor={colors.error}
            isInvalid={!!errors.email}
            onChange={(event) => {
              setState({
                ...state,
                email: event.target.value,
              })
              clearErrors()
            }}
            placeholder={"your@email.com"}
          />
        </InputGroup>
      </Flex>
      <Flex direction="column" maxWidth={400} my={3}>
        <TextBox>Password</TextBox>
        <InputGroup>
          <Input
            value={password ? password : ""}
            type={show ? "text" : "password"}
            onChange={(event) => {
              setState({
                ...state,
                password: event.target.value,
              })
              clearErrors()
            }}
            errorBorderColor={colors.error}
            isInvalid={!!errors.password}
            placeholder="enter password"
          />
          <InputRightElement width="4.5rem">
            <Button
              type="button"
              h="1.75rem"
              size="sm"
              onClick={() => setShow(!show)}
            >
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </Flex>
      <Button
        onClick={handleLogIn}
        isLoading={loading}
        disabled={!!errors.email || !!errors.password || loading}
      >
        Log in
      </Button>
      <TextBox color={colors.error}>
        {errors.email
          ? errors.email
          : errors.password
          ? errors.password
          : errors.general
          ? errors.general
          : null}
      </TextBox>
    </Section>
  )
}
