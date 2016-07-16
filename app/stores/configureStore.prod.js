import {createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'
import { hashHistory } from 'react-router'
import { routerMiddleware, push } from 'react-router-redux'
import { asyncMiddleware, redirectMiddleware } from '../middlewares'

export default function configureStore(initialState){
  const routerReduxMiddleware = routerMiddleware(hashHistory);
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk, asyncMiddleware, redirectMiddleware, routerReduxMiddleware)
  );
}
