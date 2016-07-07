jest.unmock('../rowset');
jest.unmock('../Character');

describe('Character API', ()=> {
  let charApi;

  beforeEach(()=> {
    charApi = require('../Character');
  });

  pit('can fetch character list given API key and code strings', () => {
    return charApi.apiInfo(123456, 'Some test key')
            .then(result => {
              expect(result.accessMask).toEqual('134217727');
              expect(result.characters.length).toEqual(1);
              expect(result.characters[0].characterID).toEqual('1655827332')
            });
  });

});