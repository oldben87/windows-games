import {Box, Flex, Image} from "@chakra-ui/react"
import ContentContainer from "components/common/ContentContainer"
import ExternalLink from "components/common/ExternalLink"
import Section from "components/common/Section"
import TextBox from "components/common/TextBox"
import Title from "components/common/Title"
import {Link} from "react-router-dom"
import {colors} from "styles/colors"

import "../common/ExternalLink/ExternalLink.css"

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
            <TextBox>
              If you would like to collaborate on an app please do drop me a
              message and I will help if I can.
            </TextBox>
          </Box>
        </ContentContainer>
      </Section>
      <Section
        position="BOTTOM"
        bgColor={"white"}
        underColor={colors.speedle.blue}
      >
        <ContentContainer fullScreenDirection="column">
          <Box mb={2} height="100%" color={colors.speedle.darkestBlue}>
            <Title>Got some time to kill while you're here?</Title>
            <TextBox>
              Try the one of the classics, Minesweeper or Solitaire:
            </TextBox>
          </Box>
          <Flex alignItems={"flex-start"}>
            <Flex
              my={3}
              mx={2}
              direction="column"
              justify={"center"}
              alignItems="center"
            >
              <Link to={"/minesweeper"}>
                <Image src={"/bomb.png"} h={"80px"} w={"80px"} mx="auto" />
                <TextBox textAlign="center">Minesweeper</TextBox>
              </Link>
            </Flex>
            <Flex
              my={3}
              mx={2}
              direction="column"
              justify={"center"}
              alignItems="center"
            >
              <Link to={"/solitiare"}>
                <Image
                  src={"/SolitaireIcon.png"}
                  mx="auto"
                  h={"80px"}
                  w={"80px"}
                />
                <TextBox textAlign="center">Solitaire</TextBox>
              </Link>
            </Flex>
          </Flex>
        </ContentContainer>
      </Section>
    </>
  )
}
