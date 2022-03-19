import {Box, Flex, Image} from "@chakra-ui/react"
import ContentContainer from "components/common/ContentContainer"
import ExternalLink from "components/common/ExternalLink"
import TextBox from "components/common/TextBox"
import Title from "components/common/Title"
import {colors} from "styles/colors"
import Section from "../common/Section"

export default function Apps() {
  return (
    <>
      <Section bgColor={colors.speedle.blue} position="TOP">
        <ContentContainer>
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
          <Flex
            borderRadius={5}
            boxShadow={"0 0 5px 2px rgba(0, 0, 0, 0.4)"}
            maxWidth={["250px"]}
            alignSelf="center"
          >
            <Image
              borderRadius={5}
              src="speedle(1).png"
              alt=""
              objectFit="contain"
              width={["100%"]}
            />
          </Flex>
        </ContentContainer>
      </Section>
      <Section
        position="BOTTOM"
        bgColor="white"
        underColor={colors.speedle.blue}
      >
        <ContentContainer fullScreenDirection="row-reverse">
          <Flex
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
          <Flex
            borderRadius={5}
            boxShadow={"0 0 5px 2px rgba(0, 0, 0, 0.4)"}
            maxWidth={["250px"]}
            alignSelf="center"
          >
            <Image
              borderRadius={5}
              src="ArfiDiary.png"
              alt=""
              objectFit="contain"
              maxWidth={[250]}
            />
          </Flex>
        </ContentContainer>
      </Section>
    </>
  )
}
