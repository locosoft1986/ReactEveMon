import {push} from 'react-router-redux';

/*
 * Middleware to process action with following properties:
 * - REDIRECT_KEY: String -> Action type dispatches
 * - redirect: String | Function -> If given, redirect router to go to this location
 */

export default store => next => action =>{

  const asyncKey = action['REDIRECT_KEY'];
  if (typeof asyncKey === 'undefined') {
    return next(action);
  }
  const {redirect} = action;
  next(Object.assign({}, action, {type: asyncKey}));
  // dispatch success

  if(redirect){
    setTimeout(() => {
      if (typeof(redirect) === 'function'){
        redirect(next);
      }else{
        next(push(redirect));
      }
    }, 0)

  }

}
