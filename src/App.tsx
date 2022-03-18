import Home from "components/pages/Home"
import Apps from "components/pages/Apps"
import {Route, Routes} from "react-router-dom"
import MinesweeperBoard from "components/Minesweeper/GameBoard"
import SolitiareBoard from "components/Solitaire/GameBoard"
import {NavBar} from "./components/common/NavBar"

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apps" element={<Apps />} />
        <Route
          path="/privacy"
          element={
            <div>
              <h1>Speedle Privacy Policy</h1>
              <p>We do not collect or store your data</p>
            </div>
          }
        />
        {/* Games can go below */}
        <Route path="/solitiare" element={<SolitiareBoard />} />
        <Route path="/minesweeper" element={<MinesweeperBoard />} />
      </Routes>
    </>
  )
}

export default App
