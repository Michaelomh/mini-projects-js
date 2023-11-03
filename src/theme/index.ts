import { extendTheme } from "@chakra-ui/react"
import "@fontsource-variable/roboto-slab"
import "@fontsource-variable/inter"
import "@fontsource-variable/jetbrains-mono"

import { fonts, fontWeights, textStyles } from "./typography"

const theme = extendTheme({
  fonts,
  fontWeights,
  textStyles,
})

export default theme
