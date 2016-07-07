import {combineReducers} from 'redux'
import app from './app';
import apiform from './apiform';

const views = combineReducers({
  app,
  apiform
});

export default views