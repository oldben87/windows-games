import Title from "components/common/Title"
import TextBox from "components/common/TextBox"
import {Box, UnorderedList, ListItem, Flex} from "@chakra-ui/react"

interface PrivacyData {
  title: string
  body: string
  listItems?: Array<string>
  followUp?: string
}

const data: Array<PrivacyData> = [
  {
    title: "1. The type of personal information we collect",
    body: "We currently collect and process the following information:",
    listItems: [
      "We store no user information on this website or in the mobile application Speedle.",
      "We do not collect or sell your information to any partners or third parties.",
      "If you contact us using a contact form we will use your email address and name to respond to any messages, emails or other forms of correspondance.",
      "Using information available via the Google Play Store or Apple App Store, we may use device information to help resolve issues, bugs or complaints.",
    ],
  },
  {
    title: "2. How we get the personal information and why we have it",
    body: "Most of the personal information we process is provided to us directly by you for one of the following reasons:",
    listItems: [
      "You have contacted us directly using our website or mobile applications regarding an enquiry, feedback or complaint.",
      "You have reached out or left feedback via Google Play Store or the Apple App Store.",
    ],
    followUp:
      "You may ask to have this information removed at any time. To do so please email: hello@jedi-apps.co.uk.",
  },
  {
    title: "3. How we store your personal information",
    body: "We will securly store your information until your enquiry, feedback or complaint has been fulfilled or satisfied. Or we will delete it permenantly after 365 days.",
    followUp:
      "You may ask to have this information removed at any time. To do so please email: hello@jedi-apps.co.uk.",
  },
  {
    title: "4. Your data protection rights",
    body: "Under data protection law, you have rights including:",
    listItems: [
      "Your right of access - You have the right to ask us for copies of your personal information.",
      "Your right to rectification - You have the right to ask us to rectify personal information you think is inaccurate. You also have the right to ask us to complete information you think is incomplete.",
      "Your right to erasure - You have the right to ask us to erase your personal information in certain circumstances.",
      "Your right to restriction of processing - You have the right to ask us to restrict the processing of your personal information in certain circumstances.",
      "Your right to object to processing - You have the the right to object to the processing of your personal information in certain circumstances.",
      "Your right to data portability - You have the right to ask that we transfer the personal information you gave us to another organisation, or to you, in certain circumstances.",
    ],
    followUp:
      "You are not required to pay any charge for exercising your rights. If you make a request, we have one month to respond to you. To do so please email: hello@jedi-apps.co.uk.",
  },
]

export default function Privacy() {
  return (
    <Flex direction={"column"} p={[2, 2, 5]}>
      <Box my={3}>
        <Title>Privacy Policy</Title>
        <TextBox>
          This privacy policy covers this website and the mobile application
          Speedle.
        </TextBox>
        <TextBox>Last updated on: 20th March 2022</TextBox>
      </Box>
      {data.map((section) => (
        <Box key={section.title} my={3}>
          <Title children={section.title} />
          <TextBox children={section.body} />
          {section.listItems !== undefined ? (
            <UnorderedList>
              {section.listItems.map((item) => (
                <ListItem key={item}>{item}</ListItem>
              ))}
            </UnorderedList>
          ) : null}
          {section.followUp && (
            <TextBox fontWeight={"semibold"} children={section.followUp} />
          )}
        </Box>
      ))}
    </Flex>
  )
}
