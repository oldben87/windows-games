import {Box} from "@chakra-ui/react"
import ContentContainer from "components/common/ContentContainer"
import ExternalLink from "components/common/ExternalLink"
import Section from "components/common/Section"
import TextBox from "components/common/TextBox"
import Title from "components/common/Title"
import {Link} from "react-router-dom"
import {colors} from "styles/colors"

export default function Home() {
  return (
    <>
      <Section position="TOP" bgColor={colors.speedle.blue}>
        <ContentContainer fullScreenDirection="column">
          <Box mb={2} height="100%" color={colors.speedle.darkestBlue}>
            <Title>Jedi Apps</Title>
            <TextBox>Building apps and games for fun.</TextBox>
            <Box my={5}>
              <TextBox>See our latest app SPEEDLE in open Beta now!</TextBox>
              <Box my={3}>
                <ExternalLink href="https://play.google.com/store/apps/details?id=com.speedle">
                  Google Play
                </ExternalLink>
              </Box>
            </Box>
          </Box>
        </ContentContainer>
      </Section>
      <Section position="BOTTOM">
        <ContentContainer fullScreenDirection="column">
          <Box mb={2} height="100%" color={colors.speedle.darkestBlue}>
            <Title>Some time killing games, while you're here:</Title>
            <TextBox>See the windows classics Minesweeper & Solitaire:</TextBox>
          </Box>

          <Box my={3}>
            <Link to={"/minesweeper"}>
              <TextBox>MineSweeper</TextBox>
            </Link>
          </Box>
          <Box my={3}>
            <Link to={"/solitiare"}>
              <TextBox>Solitaire</TextBox>
            </Link>
          </Box>
        </ContentContainer>
      </Section>
    </>
  )
}
