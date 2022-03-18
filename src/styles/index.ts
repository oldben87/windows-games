import {colors} from "./colors"
import {components} from "./components"
import {extendTheme} from "@chakra-ui/react"

const fonts = {
  body: "Noto Sans",
}

export const theme = extendTheme({colors, components, fonts})
