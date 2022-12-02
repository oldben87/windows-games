import {Box, Flex, Icon, Image} from "@chakra-ui/react"
import ContentContainer from "../Common/ContentContainer"
import ExternalLink from "../Common/ExternalLink"
import TextBox from "../Common/TextBox"
import Title from "../Common/Title"
import {colors} from "../../chakraStyles/colors"
import Section from "../Common/Section"
import {GiInfo} from "react-icons/gi"

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
            <Flex direction="row" gap={2} padding={3} align="start">
              <Icon
                as={GiInfo}
                color={"red.500"}
                stroke={"red.500"}
                path="red.500"
                mt={2}
              />
              <TextBox color={colors.error}>
                Unfortunately we will be turning off the infrastructure to
                ArfiDiary on the 27th of November.
              </TextBox>
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
