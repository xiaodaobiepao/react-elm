import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import React, { Component } from 'react'
// import { createBrowserHistory } from 'history'

// const Home = () => import(/* webpackChunkName: "home" */ '../view/Home/index')
import Home from '../view/Home/index'
// const City = () => import(/* webpackChunkName: "city" */ '../view/City')
import City from '../view/City'
// import Food from '../view/Food'
// import Msite from '../view/Msite'

// const history = createBrowserHistory()
// console.log(history)

export default class RouterIndex extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Redirect exact from="/" to="/home" />
          <Route path="/home" component={Home} />
          <Route path="/city/:cityid" component={City} />
          {/* <Route path="/msite" component={Msite} /> */}
          {/* <Route path="/food" component={Food} /> */}
        </Switch>
      </Router>
    )
  }
}
