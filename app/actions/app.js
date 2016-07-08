import {push} from 'react-router-redux';
import CharApi from '../api/Character';

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

export function newApiCancel() {
  return {
    type: 'APIFORM_CANCEL'
  }
}

export function apiImport(key, code, next='/') {
  return {
    ASYNC_KEY: 'APIFORM_IMPORT',
    success: next,
    call: () => CharApi.apiInfo(key, code)
  }
}
