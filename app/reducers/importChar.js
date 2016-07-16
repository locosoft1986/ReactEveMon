const initialState = {
  characters: []
};


export default function apiform(state=initialState, action) {
  switch(action.type){
    case 'APIFORM_IMPORT_SUCCESS':
      return {
        characters: action.response.slice(0)
      };
    default:
      return state;
  }
}