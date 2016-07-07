import fetch from './fetch';
import rowset from './rowset';
import Storage from './Storage';


function parseInfo(json) {
  const {eveapi: {result}} = json;

  if(!!result) {
    return rowset(result);
  }
}

const character = {
  load(charSet) {
    return new Promise((resolve, reject) => {
      if(!!charSet) {
        let loadCharRequests = Object.keys(charSet).map(characterID => {
          return fetch('/eve/CharacterInfo.xml.aspx', {characterID})
            .then(info => parseInfo(info));
        });

        return Promise.all(loadCharRequests).then(results => {
          resolve(results.filter(info => !!info));
        });
      } else {
        resolve([]);
      }
    });

  },

  loadFromStorage() {
    const charSet = Storage.charSet;
    return this.load(charSet);
  },

  apiInfo(keyID, vCode) {
    //Replace the 'key' tag in the xml to avoid stackoverflow bug in the xml2json lite
    const replaceKeyStr = (xml) => {
      return xml.replace(/<key/g, '<keyInfo').replace(/<\/key>/g, '</keyInfo>');
    };
    return new Promise((resolve, reject) => {
      fetch('/account/APIKeyInfo.xml.aspx', {keyID, vCode}, replaceKeyStr)
        .then(info => {
          const {eveapi} = info;
          if(!!eveapi.result) {
            const {keyInfo} = eveapi.result;
            resolve(rowset(keyInfo));
          } else {
            reject(eveapi);
          }
        });
    });
  }
};

export default character;