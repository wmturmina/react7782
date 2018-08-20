import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import PrivateRoute from './components/PrivateRouter'

import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import Page404 from './pages/Page404'

const Logout = () => {
  localStorage.removeItem('TOKEN')
  return <Redirect to="/login" />
}

class Routes extends Component {
  render() {
    return (
      <Switch>
        <PrivateRoute path="/" exact component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/logout" component={Logout} />
        <Route component={Page404} />
      </Switch>
    )
  }
}
export default Routes