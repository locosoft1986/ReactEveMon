jest.unmock('../asyncMiddleware');

describe('asyncMiddleware', ()=>{
  let store, next, asyncMiddleware;

  beforeEach(()=>{
    asyncMiddleware = require('../asyncMiddleware');
    store = {}
    next = jest.fn();
  });

  it("pass action to next given ASYNC_KEY is not defined in the action",  ()=>{
    const action = {
      type: "SYNCACTION"
    };

    asyncMiddleware(store)(next)(action);
    const dispatchCalls = next.mock.calls;

    expect(dispatchCalls.length).toEqual(1);
    expect(dispatchCalls[0][0]).toEqual(action);
  });

  it("raise error given action call is not defined", ()=>{
    const action = {
      ASYNC_KEY: "SYNCACTION"
    };
    expect(()=>asyncMiddleware(store)(next)(action)).toThrow(new Error('call is not a function.'))
  });

  it("raise error given action call didn't return a promise", ()=>{
    const action = {
      ASYNC_KEY: "SYNCACTION",
      call: ()=>true
    };
    expect(()=>asyncMiddleware(store)(next)(action)).toThrow(new Error('call did not return a promise.'))
  });

  pit("dispatch REQUEST and SUCCSS actions given action call is resolved", async ()=>{
    const asyncCall = Promise.resolve(true);
    const action = {
      ASYNC_KEY: "TEST",
      call: ()=>(asyncCall)
    };

    asyncMiddleware(store)(next)(action);
    await asyncCall;

    const dispatchCalls = next.mock.calls;
    expect(dispatchCalls.length).toEqual(2);

    const [requestCall, successCall] = dispatchCalls;
    expect(requestCall[0].type).toEqual('TEST_REQUEST');
    expect(successCall[0].type).toEqual('TEST_SUCCESS');
  });

  pit("dispath to success location given action success is a string", async ()=>{
    const asyncCall = Promise.resolve(true);
    const action = {
      ASYNC_KEY: "TEST",
      call: ()=>(asyncCall),
      success: "/newLocation"
    };

    asyncMiddleware(store)(next)(action);
    await asyncCall;

    const dispatchCalls = next.mock.calls;
    expect(dispatchCalls.length).toEqual(3);

    const {payload} = dispatchCalls[2][0];
    expect(payload.method).toEqual('push');
    expect(payload.args).toEqual(["/newLocation"]);
  });

  pit("call 'success' with dispatch and response given action 'success' is a function", async ()=>{
    const asyncCall = Promise.resolve("response");
    const success = jest.fn();
    const action = {
      ASYNC_KEY: "TEST",
      call: ()=>(asyncCall),
      success: success
    };

    asyncMiddleware(store)(next)(action);
    await asyncCall;

    expect(success.mock.calls.length).toEqual(1);

    const [dispatch, response] = success.mock.calls[0]
    expect(dispatch).toEqual(next);
    expect(response).toEqual('response');
  });

  pit("dispath to failure location given action failure is a string", async ()=>{
    const asyncCall = Promise.reject("error");
    const action = {
      ASYNC_KEY: "TEST",
      call: ()=>(asyncCall),
      failure: "/errorLocation"
    };

    asyncMiddleware(store)(next)(action);

    try{
      await asyncCall;
    }catch(err){}

    const dispatchCalls = next.mock.calls;
    expect(dispatchCalls.length).toEqual(3);

    const {payload} = dispatchCalls[2][0];
    expect(payload.method).toEqual('push');
    expect(payload.args).toEqual(["/errorLocation"]);
  });

  pit("call 'failure' with dispatch and error given action 'failure' is a function", async ()=>{
    const asyncCall = Promise.reject("error");
    const failure = jest.fn();
    const action = {
      ASYNC_KEY: "TEST",
      call: ()=>(asyncCall),
      failure: failure
    };

    asyncMiddleware(store)(next)(action);

    try{
      await asyncCall;
    }catch(err){}

    expect(failure.mock.calls.length).toEqual(1);
    const [dispatch, error] = failure.mock.calls[0]
    expect(dispatch).toEqual(next);
    expect(error).toEqual('error');
  })

});
