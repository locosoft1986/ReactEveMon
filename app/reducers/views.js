import {combineReducers} from 'redux'
import app from './app';
import apiform from './apiform';
import importChar from './importChar';

const views = combineReducers({
  app,
  apiform,
  importChar
});

export default views