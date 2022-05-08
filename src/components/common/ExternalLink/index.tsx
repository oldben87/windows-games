import {Link} from "@chakra-ui/react"
import {colors} from "styles/colors"

import "./ExternalLink.css"

interface LinkProps {
  children: React.ReactNode
  href: string
  bgColor?: string
  mr?: number
  ml?: number
  mt?: number
  mb?: number
  m?: number
}

const ExternalLink = ({
  children,
  href,
  bgColor = colors.speedle.darkestBlue,
  ...rest
}: LinkProps) => (
  <Link
    href={href}
    target="_blank"
    rel="noreferrer"
    bg={bgColor}
    color="white"
    className="ExternalLink"
    textDecoration={"none"}
    {...rest}
  >
    {children}
  </Link>
)

export default ExternalLink
