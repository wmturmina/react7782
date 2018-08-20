import React, { Component } from 'react'
import './cabecalho.css'

class Cabecalho extends Component {
  render() {
    console.warn(this.props)
    return (
      <header className="cabecalho">
        <div className="cabecalho__container container">
          <h1 className="cabecalho__logo">
            <a href="">Twitelum</a>
          </h1>
          {this.props.children}
        </div>
      </header>
    )
  }
}

export default Cabecalho
