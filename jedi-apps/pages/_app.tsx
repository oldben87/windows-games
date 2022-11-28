import "../styles/globals.css"
import type {AppProps} from "next/app"
import {ChakraProvider} from "@chakra-ui/react"
import {theme} from "../chakraStyles"
import Layout from "../Components/Layout"
import {AuthUserProvider} from "../AuthContext"

export default function App({Component, pageProps}: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <AuthUserProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthUserProvider>
    </ChakraProvider>
  )
}
