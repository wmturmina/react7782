import React, { Component, Fragment } from 'react'
import Cabecalho from './components/Cabecalho'
import NavMenu from './components/NavMenu'

class App extends Component {
  render() {
    return (
      <Fragment>
        <Cabecalho>
          <NavMenu usuario="wmturmina" />
        </Cabecalho>
      </Fragment>
    )
  }
}

export default App
