import {colors} from "./colors"
import {components} from "./components"
import {extendTheme} from "@chakra-ui/react"

const fonts = {
  body: "Noto Sans",
}

export const theme = extendTheme({
  global: {
    "html, body": {
      backgroundColor: "#F0F0F0",
      margin: 0,
      padding: 0,
      boxSizing: "border-box",
      height: "100vh",
      minHeight: "100vh",
    },
  },
  colors,
  components,
  fonts,
})
