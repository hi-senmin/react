import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import AddUpdate from './add-update'
import Home from './home'
import Detail from './detail'


export class Product extends Component {
  render() {
    return (
      <Switch>
        <Route path="/product" exact component={Home} />
        <Route path="/product/addupdate" component={AddUpdate} />
        <Route path="/product/detail" component={Detail} />
        <Redirect to="/product" />
      </Switch>
    )
  }
}

export default Product
