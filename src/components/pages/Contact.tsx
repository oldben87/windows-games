import {Box, Flex} from "@chakra-ui/react"
import ContentContainer from "components/common/ContentContainer"
import ExternalLink from "components/common/ExternalLink"
import Section from "components/common/Section"
import TextBox from "components/common/TextBox"
import Title from "components/common/Title"
import {colors} from "styles/colors"

export default function Contact() {
  return (
    <Section bgColor={colors.speedle.blue}>
      <ContentContainer fullScreenDirection="column">
        <Box mb={2}>
          <Title>Contact us</Title>
          <TextBox>
            If you're having problems, or have some feedback about one of our
            apps I would love to hear from you.
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
          <ExternalLink
            children={"Email"}
            href="mailto:hello@jedi-apps.co.uk"
          />
        </Flex>
      </ContentContainer>
    </Section>
  )
}
