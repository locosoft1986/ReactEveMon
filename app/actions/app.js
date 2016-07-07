import {push} from 'react-router-redux';

export function to(path){
  return (dispatch)=>{
    dispatch(push(path));
  }
}

export function newApi() {
  return {
    type: 'APIFORM_NEW'
  }
}
