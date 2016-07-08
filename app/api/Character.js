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

  info(characterID) {
    return fetch('/eve/CharacterInfo.xml.aspx', {characterID})
            .then(json => parseInfo(json))
  },

  loadSet(charSet) {
    return new Promise((resolve, reject) => {
      if(!!charSet) {
        let loadCharRequests = Object.keys(charSet).map(characterID => {
          return this.info(characterID)
            .then(info => {
              const {keyID, vCode, accessMask} = charSet[characterID];
              return Object.assign({}, info, {keyID, vCode, accessMask});
            })
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
    return Storage.charSet;
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
            const keyinfo = rowset(eveapi.result.keyInfo);
            const idSet = keyinfo.characters.reduce((memo, char) => {
              memo[char.characterID] = {
                keyID, vCode,
                accessMask: keyinfo.accessMask
              };
              return memo;
            }, {});

            return this.loadSet(idSet).then(charInfos => resolve(charInfos));
          } else {
            reject(eveapi);
          }
        });
    });
  }
};

export default character;