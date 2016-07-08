import CharAPI from '../api/Character';

export function add() {
  return {
    type: 'CHAR_ADD'
  }
}

export function restoreCharacters(charSet) {
  return (dispatch) => {
    if(!!charSet && Object.keys(charSet).length > 0) {
      dispatch({
        type: 'RESTORE_CHARACTERS',
        charSet
      })
    }
  };
}

export function remove(id) {
  return {
    type: 'CHAR_REMOVE',
    id
  }
}