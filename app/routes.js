import React from 'react'
import { Route, IndexRoute, Redirect, IndexRedirect } from 'react-router'
import {App} from './containers'

export default (store) => {

  return(
    <Route component={App}>
    </Route>
  )
}
