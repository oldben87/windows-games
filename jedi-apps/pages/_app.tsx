import "../styles/globals.css"
import type {AppProps} from "next/app"
import {ChakraProvider} from "@chakra-ui/react"
import {theme} from "../chakraStyles"
import Layout from "../Components/Layout"

export default function App({Component, pageProps}: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  )
}
