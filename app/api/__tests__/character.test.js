jest.unmock('../rowset');
jest.unmock('../Character');

describe('Character API', ()=> {
  let charApi;

  beforeEach(()=> {
    charApi = require('../Character');
  });

  xit('can load characters info given a set of characters id set', () => {
    return charApi.loadSet({'795194955': {keyID: 123456, vCode: 'Test key', accessMask: 'test Mask'}})
            .then(result => {
              expect(result.length).toEqual(1);
              expect(result[0].accessMask).toEqual('test Mask');
              expect(result[0].characterID).toEqual('795194955');
              expect(result[0].keyID).toEqual(123456);
              expect(result[0].vCode).toEqual('Test key');
              expect(result[0].employmentHistory.length).toEqual(4);
            });
  });

  xit('can fetch character list given API key and code strings', () => {
    return charApi.apiInfo(123456, 'Some test key')
            .then(result => {
              expect(result.length).toEqual(1);
              expect(result[0].accessMask).toEqual('134217727');
              expect(result[0].characterID).toEqual('795194955');
              expect(result[0].keyID).toEqual(123456);
              expect(result[0].vCode).toEqual('Some test key');
            });
  });

});