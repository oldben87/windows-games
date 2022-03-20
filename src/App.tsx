import Home2 from "components/pages/Home2"
import Apps from "components/pages/Apps"
import Contact from "components/pages/Contact"
import About from "components/pages/About"
import {Route, Routes} from "react-router-dom"
import MinesweeperBoard from "components/Minesweeper/GameBoard"
import SolitiareBoard from "components/Solitaire/GameBoard"
import {NavBar} from "./components/common/NavBar"
import PageContainer from "components/common/PageContainer"
import Privacy from "components/pages/Privacy"

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
          <Route path="/solitiare" element={<SolitiareBoard />} />
          <Route path="/minesweeper" element={<MinesweeperBoard />} />
        </Routes>
      </PageContainer>
    </>
  )
}

export default App
