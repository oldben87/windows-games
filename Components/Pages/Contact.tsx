import {Box, Flex} from "@chakra-ui/react"
import ContentContainer from "../Common/ContentContainer"
import ExternalLink from "../Common/ExternalLink"
import Section from "../Common/Section"
import TextBox from "../Common/TextBox"
import Title from "../Common/Title"
import {colors} from "../../chakraStyles/colors"

export default function Contact() {
  return (
    <Section bgColor={colors.speedle.blue}>
      <ContentContainer fullScreenDirection="column">
        <Box mb={2}>
          <Title>Contact us</Title>
          <TextBox>
            If you&#39;re having problems, or have some feedback about one of
            our apps I would love to hear from you.
          </TextBox>
          <TextBox>
            I am also happy to help if you have an app you would like to
            collaborate on.
          </TextBox>
          <TextBox>
            Please feel free to use the below link to pop us an email.
          </TextBox>
        </Box>
        <Flex h="100%" alignItems={"center"}>
          <ExternalLink href="mailto:hello@jedi-apps.co.uk">Email</ExternalLink>
        </Flex>
      </ContentContainer>
    </Section>
  )
}
