import {Box} from "@chakra-ui/react"
import ContentContainer from "../Common/ContentContainer"
import Section from "../Common/Section"
import TextBox from "../Common/TextBox"
import Title from "../Common/Title"
import {colors} from "../../chakraStyles/colors"

export default function About() {
  return (
    <Section bgColor={colors.speedle.blue}>
      <ContentContainer fullScreenDirection="column">
        <Box mb={2} height="100%">
          <Title>About</Title>
          <TextBox>
            A lone developer sitting on his sofa, I make apps that I think will
            be fun, and others may enjoy or find some use of.
          </TextBox>
          <TextBox>
            I am always looking for something fun to build, so let me know if
            you have an idea you would like some help with!
          </TextBox>
          <TextBox>
            If you have enjoyed or made use of one of my apps please do get in
            touch and give feedback, I am always happy to hear from you!
          </TextBox>
        </Box>
      </ContentContainer>
    </Section>
  )
}
