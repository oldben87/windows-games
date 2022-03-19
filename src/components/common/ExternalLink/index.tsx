import {Link} from "@chakra-ui/react"
import {colors} from "styles/colors"

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

export default ExternalLink
