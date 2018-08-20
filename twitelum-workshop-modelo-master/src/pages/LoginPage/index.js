import React, { Component } from 'react'
import Widget from '../../components/Widget'

import './loginPage.css'

class LoginPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: false
    }
  }

  doLogin = (event) => {
    event.preventDefault()
    const loginData = {
      login: this.inputLogin.value,
      senha: this.inputPass.value
    }
    fetch('http://twitelum-api.herokuapp.com/login', {
      method: 'POST',
      body: JSON.stringify(loginData)
    })
      .then((response) => {
        if (response.status !== 200) {
          throw response
        }
        return response.json()
      })
      .then((response) => {
        localStorage.setItem('TOKEN', response.token)
        this.props.history.push('/')
      })
      .catch(() => {
        this.setState({ error: true })
      })
  }

  render() {
    const { error } = this.state
    return (
      <div className="loginPage">
        <div className="container">
          <Widget>
            <h1 className="loginPage__title">Twitelum</h1>
            <form className="loginPage__form" onSubmit={this.doLogin} action="/">
              <div className="loginPage__inputWrap">
                <label className="loginPage__label" htmlFor="login">Login</label>
                <input
                  className="loginPage__input"
                  type="text"
                  id="login"
                  name="login"
                  ref={(inputLogin) => { this.inputLogin = inputLogin }}
                />
              </div>
              <div className="loginPage__inputWrap">
                <label className="loginPage__label" htmlFor="senha">Senha</label>
                <input
                  className="loginPage__input"
                  type="password"
                  id="senha"
                  name="senha"
                  ref={(inputPass) => { this.inputPass = inputPass }}
                />
              </div>
              {error &&
                <div className="loginPage__errorBox">
                  Usuário ou Senha inválidos
                </div>
              }
              <div className="loginPage__inputWrap">
                <button className="loginPage__btnLogin" type="submit">
                  Logar
                </button>
              </div>
            </form>
          </Widget>
        </div>
      </div>
    )
  }
}

export default LoginPage