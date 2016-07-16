import {hamster} from './hamster';
import Storage from './Storage';

const character = {

  info(characterID, params={}) {
    hamster.clearParams();
    hamster.setParams({characterID, ...params});
    return hamster.fetch('eve:CharacterInfo');
  },

  sheet(characterID, keyID, vCode) {
    hamster.clearParams();
    hamster.setParams({characterID, keyID, vCode});
    return hamster.fetch('char:CharacterSheet');
  },

  combinedInfo(characterID, keyID, vCode) {
    const next = (info) => {
      return this.sheet(characterID, keyID, vCode)
        .then(sheet => {
          return Object.assign({}, sheet, info);
        });
    };
    return this.info(characterID, {keyID, vCode})
      .then(next);
  },

  loadSet(charSet) {
    let loadCharRequests = Object.keys(charSet).map(characterID => {
      const {keyID, vCode} = charSet[characterID];
      return this.combinedInfo(characterID, keyID, vCode)
        .then(info => {
          return Object.assign({}, info, {keyID, vCode});
        })
    });

    return Promise.all(loadCharRequests);
  },

  loadFromStorage() {
    return Storage.charSet;
  },

  apiInfo(keyID, vCode) {
    const next = info => {
      const {key: {characters}} = info;
      const idSet = characters.reduce((memo, char) => {
        memo[char.characterID] = Object.assign({}, char, {keyID, vCode});
        return memo;
      }, {});

      return this.loadSet(idSet, keyID, vCode);
    };

    hamster.clearParams();
    hamster.setParams({keyID, vCode});
    return hamster.fetch('account:APIKeyInfo').then(next);
  }
};

export default character;