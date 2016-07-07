import {account, eve} from './fake';
let parser = require('xml2json-light');

const fakeData = {
  "eve/CharacterInfo": eve.CHAR_INFO,
  "account/APIKeyInfo" : account.API_INFO
};
export default (url, args, xmlModifier) => {
  const endIndex = url.indexOf('.xml');
  const key = url.substr(1, endIndex - 1);
  const data = fakeData[key];

  return new Promise((resolve, reject) => {
    function parse() {
      const modifiedXml = !!xmlModifier ? xmlModifier(data) : data;
      resolve(parser.xml2json(modifiedXml));
    }

    process.nextTick(
      () => !!data ? parse() : reject({
        error: 'Api not found'
      })
    );
  });
}