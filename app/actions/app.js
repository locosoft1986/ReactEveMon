import {push} from 'react-router-redux';

export function to(path){
  return (dispatch)=>{
    dispatch(push(path));
  }
}
