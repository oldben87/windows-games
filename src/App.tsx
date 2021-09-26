import GameBoard from 'components/pages/GameBoard'
import Home from 'components/pages/Home'
import { Route } from 'react-router-dom'

function App() {
  return (
    <>
      <Route exact path="/" component={Home} />
      <Route path="/solitaire" component={GameBoard} />
    </>
  )
}

export default App
