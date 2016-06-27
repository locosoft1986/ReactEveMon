import {createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'
import { browserHistory } from 'react-router'
import { routerMiddleware, push } from 'react-router-redux'
import { asyncMiddleware } from '../middlewares'

export default function configureStore(initialState){
  const routerReduxMiddleware = routerMiddleware(browserHistory);
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk, asyncMiddleware, routerReduxMiddleware)
  );
}
