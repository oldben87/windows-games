import {Flex} from "@chakra-ui/react"

interface Props {
  children: React.ReactNode
}

const PageContainer = (props: Props) => (
  <Flex
    flexDirection={"column"}
    paddingTop={[120, 120, 70]}
    minHeight={"100vh"}
    {...props}
  />
)

export default PageContainer
