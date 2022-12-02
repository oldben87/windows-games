import PageContainer from "../PageContainer"
import {NavBar} from "./NavBar"

export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <>
      <NavBar />
      <PageContainer>
        <main>{children}</main>
      </PageContainer>
    </>
  )
}
