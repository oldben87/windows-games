import Home from "components/pages/Home"
import {Route, Routes} from "react-router-dom"
import MinesweeperBoard from "components/Minesweeper/GameBoard"
import SolitiareBoard from "components/Solitaire/GameBoard"
import {NavBar} from "./components/NavBar"

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/solitiare" element={<SolitiareBoard />} />
        <Route path="/minesweeper" element={<MinesweeperBoard />} />
      </Routes>
    </>
  )
}

export default App
