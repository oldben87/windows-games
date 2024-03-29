import {Box, Flex, Image} from "@chakra-ui/react"
import ContentContainer from "../Common/ContentContainer"
import ExternalLink from "../Common/ExternalLink"
import Section from "../Common/Section"
import TextBox from "../Common/TextBox"
import Title from "../Common/Title"
import {colors} from "../../chakraStyles/colors"

import Link from "next/link"

export default function Home() {
  return (
    <>
      <Section position="TOP" bgColor={colors.speedle.blue}>
        <ContentContainer fullScreenDirection="column">
          <Box mb={2} height="100%" color={colors.speedle.darkestBlue}>
            <Title>Jedi Apps</Title>
            <TextBox>Building apps and games for fun.</TextBox>
            <Box my={5}>
              <TextBox>See our latest app SPEEDLE!</TextBox>
              <Box my={3}>
                <ExternalLink
                  mr={2}
                  href="https://play.google.com/store/apps/details?id=com.speedle"
                >
                  Google Play
                </ExternalLink>
                <ExternalLink href="https://apps.apple.com/gb/app/speedle/id1615658854">
                  App Store
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
            <Title>Got some time to kill while you&#39;re here?</Title>
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
              <Link href={"/minesweeper"}>
                <Image
                  src={"/bomb.png"}
                  h={"80px"}
                  w={"80px"}
                  mx="auto"
                  alt="Minesweeper logo"
                />
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
              <Link href={"/solitaire"}>
                <Image
                  src={"/SolitaireIcon.png"}
                  mx="auto"
                  h={"80px"}
                  w={"80px"}
                  alt="Solitaire Logo"
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
