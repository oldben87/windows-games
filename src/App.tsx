import Home2 from "components/pages/Home"
import Apps from "components/pages/Apps"
import Contact from "components/pages/Contact"
import About from "components/pages/About"
import {Route, Routes, Navigate, Outlet} from "react-router-dom"

import MinesweeperBoard from "components/pages/Minesweeper/GameBoard"
import SolitaireBoard from "components/pages/Solitaire/GameBoard"
import {NavBar} from "./components/common/NavBar"
import PageContainer from "components/common/PageContainer"
import Privacy from "components/pages/Privacy"
import HiddenAuth from "components/pages/HiddenAuth"
import HiddenHome from "components/pages/HiddenHome"
import {useEffect, useState} from "react"
import {listenForAuthState} from "FirebaseApi/auth"
import {User} from "firebase/auth"
import {Flex, Spinner} from "@chakra-ui/react"
import {colors} from "styles/colors"
import HiddenRecipesAdd from "components/pages/HiddenRecipesAdd"

const PrivateRoute = () => {
  const [user, setUser] = useState<User | null>(null)
  const [initialLoad, setInitialLoad] = useState(true)

  useEffect(() => {
    const cleanup = listenForAuthState((userRes) => {
      setUser(userRes)
      setInitialLoad(false)
    })
    return () => cleanup()
  }, [])

  if (initialLoad) {
    return (
      <Flex mt={5} justifyContent="center">
        <Spinner size="lg" thickness="4px" color={colors.speedle.darkBlue} />
      </Flex>
    )
  }

  if (!user) {
    return <Navigate to="/hidden/auth" />
  } else return <Outlet />
}

function App() {
  return (
    <>
      <NavBar />
      <PageContainer>
        <Routes>
          <Route path="/" element={<Home2 />} />
          <Route path="/apps" element={<Apps />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          {/* Games can go below */}
          <Route path="/solitaire" element={<SolitaireBoard />} />
          <Route path="/minesweeper" element={<MinesweeperBoard />} />
          <Route path="/hidden" element={<PrivateRoute />}>
            <Route path="/hidden" element={<HiddenHome />} />
          </Route>
          <Route path="/hidden/recipe" element={<PrivateRoute />}>
            <Route path="/hidden/recipe" element={<HiddenRecipesAdd />} />
          </Route>
          <Route path="/hidden/recipe" element={<PrivateRoute />}>
            <Route
              path="/hidden/recipe/:recipeId"
              element={<HiddenRecipesAdd />}
            />
          </Route>
          <Route path="/hidden/auth" element={<HiddenAuth />} />
        </Routes>
      </PageContainer>
    </>
  )
}

export default App
