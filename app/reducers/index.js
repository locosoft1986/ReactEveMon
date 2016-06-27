import {combineReducers} from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import app from './app';
import characters from './characters';

const rootReducer = combineReducers({
  app,
  characters,
  routing
});

export default rootReducer
