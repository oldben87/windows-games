import {Box, Flex, Text, Image, Link} from "@chakra-ui/react"
import React from "react"
import {colors} from "styles/colors"
import Section from "../common/Section"

import "./Apps.css"

interface TextProps {
  children: React.ReactNode
}

const Title = ({children}: TextProps) => (
  <Text fontSize={28} color={colors.speedle.darkestBlue} p={1}>
    {children}
  </Text>
)

const TextBox = ({children}: TextProps) => <Text my={1}>{children}</Text>

interface LinkProps {
  children: React.ReactNode
  href: string
}

const ExternalLink = ({children, href}: LinkProps) => (
  <Link
    href={href}
    target="_blank"
    rel="noreferrer"
    bg={colors.speedle.darkestBlue}
    color="white"
    className="ExternalLink"
  >
    {children}
  </Link>
)

export default function Apps() {
  return (
    <>
      <Section bgColor={colors.speedle.blue} position="TOP">
        <Flex
          height="100%"
          boxShadow={"lg"}
          bg="white"
          borderRadius={3}
          direction={["column", "column", "row"]}
          justifyContent="space-around"
          p={[4, 4, 50]}
        >
          <Flex
            h="100%"
            width={["100%", "100%", "45%"]}
            direction="column"
            justifyContent="space-around"
            px={4}
            py={4}
          >
            <Box>
              <Title>Speedle</Title>
              <TextBox>Play your way:</TextBox>
              <TextBox> - 5 Letter words or 6 Letter words</TextBox>
              <TextBox> - Choose how many guesses you have</TextBox>
              <TextBox>
                - Play once a day, or free play as much as you like
              </TextBox>
              <TextBox>
                - Compete with your friends to see who can solve a game the
                fastest
              </TextBox>
            </Box>
            <Flex direction="column">
              <TextBox>Try now on:</TextBox>
              <ExternalLink href=""> Google Play</ExternalLink>
            </Flex>
          </Flex>
          <Box borderRadius={5} boxShadow={"0 0 5px 2px rgba(0, 0, 0, 0.4)"}>
            <Image
              borderRadius={5}
              src="speedle(1).png"
              alt=""
              objectFit="contain"
              maxWidth={["100%", "100%", 250]}
            />
          </Box>
        </Flex>
      </Section>
      <Section
        position="BOTTOM"
        bgColor="white"
        underColor={colors.speedle.blue}
      >
        <Text>Lovely!</Text>
      </Section>
    </>
  )
}
