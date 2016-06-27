import pullAt from 'lodash/pullat';

const initialState = {
  errors:[],
  requests:[]
};

const removeLast = (array, value) => {
  const foundAt = array.lastIndexOf(value);

  if(foundAt < 0){
    return array;
  }
  const newArray = [...array];
  pullAt(newArray, [foundAt]);
  return newArray;
};

export default function app(state=initialState, action) {
  const splitAt = action.type.lastIndexOf('_');
  if(splitAt < 1){
    return state;
  }

  const actionType = action.type.slice(0, splitAt);
  const actionPhase = action.type.slice(splitAt+1, action.type.length);

  switch(actionPhase){
    case 'REQUEST':
      return Object.assign({}, state, {requests: [...state.requests, actionType]});

    case 'SUCCESS':
      return Object.assign({}, state, {requests: removeLast(state.requests, actionType)});

    case 'FAILURE':
      let requests = removeLast(state.requests, actionType);
      let {type, error} = action;
      let errors = [...state.errors, {type, error}];
      return Object.assign({}, state, {requests, errors});

    default:
      return state;
  }
}
