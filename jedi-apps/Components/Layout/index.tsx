import PageContainer from "../PageContainer"

export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <PageContainer>
      <main>{children}</main>
    </PageContainer>
  )
}
