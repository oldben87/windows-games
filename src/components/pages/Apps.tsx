import {Box, Flex, Text, Image, Link} from "@chakra-ui/react"
import React from "react"
import {colors} from "styles/colors"
import Section from "../common/Section"

import "./Apps.css"

interface TextProps {
  children: React.ReactNode
  color?: string
  fontWeight?:
    | number
    | "bold"
    | "hairline"
    | "thin"
    | "light"
    | "normal"
    | "medium"
    | "semibold"
    | "extrabold"
    | "black"
}

const Title = ({
  children,
  fontWeight,
  color = colors.speedle.darkestBlue,
}: TextProps) => (
  <Text fontWeight={fontWeight} fontSize={28} color={color} p={1}>
    {children}
  </Text>
)

const TextBox = ({children}: TextProps) => <Text my={1}>{children}</Text>

interface LinkProps {
  children: React.ReactNode
  href: string
  bgColor?: string
}

const ExternalLink = ({
  children,
  href,
  bgColor = colors.speedle.darkestBlue,
}: LinkProps) => (
  <Link
    href={href}
    target="_blank"
    rel="noreferrer"
    bg={bgColor}
    color="white"
    className="ExternalLink"
    textDecoration={"none"}
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
              <ExternalLink href="https://play.google.com/store/apps/details?id=com.speedle">
                Google Play
              </ExternalLink>
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
        <Flex
          height="100%"
          boxShadow={"lg"}
          bg="white"
          borderRadius={3}
          direction={["column", "column", "row-reverse"]}
          justifyContent="space-around"
          p={[4, 4, 50]}
          color={colors.arfidiary.brandBlue}
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
              <Title color={colors.arfidiary.brandBlue} fontWeight={"semibold"}>
                ArfiDiary
              </Title>
              <TextBox>List your safe foods</TextBox>
              <TextBox>Log which foods are being eaten and when</TextBox>
              <TextBox>Keep a seperate diary for different loved ones</TextBox>
            </Box>
            <Flex direction="column">
              <TextBox>Try now on:</TextBox>
              <ExternalLink
                href="https://play.google.com/store/apps/details?id=com.speedle"
                bgColor={colors.arfidiary.brandBlue}
              >
                Google Play
              </ExternalLink>
            </Flex>
          </Flex>
          <Box borderRadius={5} boxShadow={"0 0 5px 2px rgba(0, 0, 0, 0.4)"}>
            <Image
              borderRadius={5}
              src="ArfiDiary.png"
              alt=""
              objectFit="contain"
              maxWidth={["100%", "100%", 250]}
            />
          </Box>
        </Flex>
      </Section>
    </>
  )
}
