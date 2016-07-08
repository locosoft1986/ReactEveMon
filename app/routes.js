import React from 'react'
import { Route, IndexRoute, Redirect, IndexRedirect } from 'react-router'
import {App, CharManager} from './containers'

export default (store) => {

  return(
    <Route path='/' component={App}>
      <IndexRoute component={CharManager}/>
    </Route>
  )
}
