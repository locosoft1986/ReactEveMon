import * as axios from 'axios';

axios.defaults.baseURL = 'https://api.eveonline.com';
axios.defaults.timeout = 5000;

export default (url, args) => {
  return axios.get(url, {
    params: args,
    responseType: 'text'
  });
}