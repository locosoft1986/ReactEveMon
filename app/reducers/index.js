import {combineReducers} from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import views from './views';
import characters from './characters';

const rootReducer = combineReducers({
  views,
  characters,
  routing
});

export default rootReducer
