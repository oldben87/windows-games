import {Flex} from "@chakra-ui/react"
import Head from "next/head"

interface Props {
  children: React.ReactNode
}

const PageContainer = ({children}: Props) => (
  <Flex
    flexDirection={"column"}
    paddingTop={[120, 120, 70]}
    minHeight={"100vh"}
  >
    <Head>
      <title>Jedi Apps</title>
      <meta name="description" content="May the force be with you" />
      <link rel="icon" href="/pageicon.png" />
    </Head>
    {children}
  </Flex>
)

export default PageContainer
