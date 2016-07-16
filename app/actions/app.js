import {push, goBack} from 'react-router-redux';
import CharApi from '../api/Character';

export function to(path){
   return push(path);
}

export function back(){
  return goBack();
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

export function apiImport({key, code}, next='/import') {
  return {
    ASYNC_KEY: 'APIFORM_IMPORT',
    success: next,
    call: () => CharApi.apiInfo(key, code)
  }
}
