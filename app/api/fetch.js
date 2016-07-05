import * as axios from 'axios';
let parser = require('xml2json-light');

axios.defaults.baseURL = 'https://api.eveonline.com';
axios.defaults.timeout = 5000;

export default (url, args, xmlModifier) => {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: args,
      responseType: 'text'
    }).then(xml => {
      const {data} = xml;
      const modifiedXml = !!xmlModifier ? xmlModifier(data) : data;
      resolve(parser.xml2json(modifiedXml));
    }).catch(error => {
      reject(error);
    });
  });
}