import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import React, { Component } from 'react'

// const Home = () => import(/* webpackChunkName: "home" */ '../view/Home/index')
import Home from '../view/Home/index'
// const City = () => import(/* webpackChunkName: "city" */ '../view/City')
import City from '../view/City'

export default class RouterIndex extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Redirect exact from="/" to="/home" />
          <Route path="/home" component={Home} />
          <Route path="/city" component={City} />
        </Switch>
      </Router>
    )
  }
}
