import {push} from 'react-router-redux';

/*
 * Middleware to process action with following properties:
 * - ASYNC_KEY: String -> Action type prefix for request, success, failure dispatches
 * - call: Function -> A function returns a promise for async call.
 * - success: String -> If given, when call success router will go to this location
 * - failure: String -> If given, when call failed router will go to this location
 */

export default store => next => action =>{

  const asyncKey = action['ASYNC_KEY'];
  if (typeof asyncKey === 'undefined') {
    return next(action)
  }

  const { call, success, failure, ...actionData } = action;
  const dispatchWith = (data)=>{
    return next(Object.assign({}, actionData, data));
  }

  if(!(call && 'function' === typeof call)){
    // call is not a function
    throw new Error('call is not a function.')
  }

  const promise = call();
  if (!(promise && 'function' === typeof promise.then)){
    // call didn't return a promise
    throw new Error('call did not return a promise.');
  }


  dispatchWith({type: `${asyncKey}_REQUEST`});
  promise.then(
    response =>{
      // dispatch success
      dispatchWith({
        type: `${asyncKey}_SUCCESS`,
        response
      });

      // dispatch success
      if(success){
        if (typeof(success) === 'function'){
          success(next, response);
        }else{
          next(push(success));
        }
      }
    },
    error=>{
      // dispatch failure
      dispatchWith({
        type: `${asyncKey}_FAILURE`,
        error
      });

      // dispatch failure
      if(failure){
        if (typeof(failure) === 'function'){
          failure(next, error);
        }else{
          next(push(failure))
        }
      }
    }
  )
}
