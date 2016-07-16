const initialState = {
  busy: false,
  active: false
};


export default function apiform(state=initialState, action) {
  switch(action.type){
    case 'APIFORM_NEW':
      return Object.assign({}, state, {active: true, busy: false});

    case 'APIFORM_IMPORT_REQUEST':
      return Object.assign({}, state, {active: false, busy: false});

    case 'APIFORM_IMPORT_FAILURE':
      return Object.assign({}, state, {busy: false});

    case 'APIFORM_CANCEL':
      return Object.assign({}, state, initialState);

    default:
      return state;
  }
}
