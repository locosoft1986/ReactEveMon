import React from 'react'
import { render } from 'react-dom'
import { Router, hashHistory } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import createRoutes from './routes';
import merge from 'lodash/merge'
import configureStore from './stores/configureStore'
import CharApi from './api/Character';
import {charActions} from './actions';

import './assets/styles/material-icons.css';
import './assets/styles/roboto.css';
import './assets/styles/commons.scss';
import './assets/styles/transitions.css';
import './assets/styles/app.scss';


function init(charSet){
  const initialState = merge({}, window.__INITIAL_STATE__);
  const store = configureStore(initialState);

  charActions.restoreCharacters(charSet || {})(store.dispatch);

  const history = syncHistoryWithStore(hashHistory, store);
  const routes = createRoutes(store);

  render(
    <Provider store={store}>
      <Router history={history}>
        {routes}
      </Router>
    </Provider>, document.getElementById('root')
  );
}

init(CharApi.loadFromStorage());
