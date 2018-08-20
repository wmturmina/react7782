import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'

class PrivateRoute extends Component {
  render() {
    const ReturnComponent = this.props.component
    if (!localStorage.getItem('TOKEN')) {
      return <Redirect to="/login" />
    }
    return (
      <Route component={ReturnComponent} />
    )
  }
}
export default PrivateRoute