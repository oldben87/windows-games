import Home from 'components/pages/Home'
import { Route } from 'react-router-dom'
import MinesweeperBoard from 'components/Minesweeper/GameBoard'

function App() {
  return (
    <>
      <Route exact path="/" component={Home} />
      <Route exact path="/minesweeper" component={MinesweeperBoard} />
    </>
  )
}

export default App
