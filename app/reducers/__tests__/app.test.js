jest.unmock('../app');

describe('app reducer', ()=>{
  let app;

  beforeEach(()=>{
    app = require('../app');
  });

  describe('action in REQUEST phase',() => {
    it('append actionType to requests', () => {
      const prevState = {requests:['ADD_USER']};
      const state = app(prevState, {type: 'ADD_USER_REQUEST'});

      expect(state.requests).not.toEqual(prevState.requests);
      expect(state.requests).toEqual(['ADD_USER', 'ADD_USER']);
    })
  });

  describe('action in SUCCESS phase', () => {
    it('remove actionType from requests', () => {
      const prevState = {requests:['ADD_USER']};
      const state = app(prevState, {type: 'ADD_USER_SUCCESS'});
      expect(state.requests).not.toEqual(prevState.requests);
      expect(state.requests).toEqual([]);
    })
  });

  describe('action in FAILURE phase', () => {
    it('remove actionType from requests and add to error', ()=>{
      const prevState = {requests:['ADD_USER'], errors:[]};
      const state = app(prevState, {type: 'ADD_USER_FAILURE', error:'error'});
      expect(state.requests).not.toEqual(prevState.requests);
      expect(state.requests).toEqual([]);
      expect(state.errors).toEqual([{type:'ADD_USER_FAILURE', error:'error'}]);
    });
  });


});
