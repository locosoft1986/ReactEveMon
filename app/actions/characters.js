import CharAPI from '../api/Character';

export function add(characters) {
  return {
    REDIRECT_KEY: 'ADD_CHARACTER',
    characters,
    redirect: '/'
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
    type: 'REMOVE_CHARACTER',
    id
  }
}