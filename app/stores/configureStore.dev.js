import {createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'
import createLogger from 'redux-logger'
import { browserHistory } from 'react-router'
import { routerMiddleware, push } from 'react-router-redux'
import { asyncMiddleware } from '../middlewares'

export default function configureStore(initialState){

  const routerReduxMiddleware = routerMiddleware(browserHistory);
  const loggerMiddleware = createLogger();
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk, asyncMiddleware, routerReduxMiddleware, loggerMiddleware)
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer)
    })
  }

  return store;
}
