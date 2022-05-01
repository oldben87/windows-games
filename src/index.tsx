import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import {ChakraProvider} from "@chakra-ui/react"
import {theme} from "styles"
import {BrowserRouter} from "react-router-dom"
import {store} from "Redux/store"
import {Provider} from "react-redux"

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root"),
)
