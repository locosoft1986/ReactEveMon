const initState = [];

function set2Array(charSet) {
  return Object.keys(charSet).reduce((memo, charID) => {
    memo.push(charSet[charID]);
    return memo;
  }, []);
}

function array2Set(characters) {
  return characters.reduce((memo, char) => {
    if(!!char.characterID) {
      memo[char.characterID] = char;
    }

    return memo;
  }, {});
}

export default function characters(state=initState, action) {

  switch(action.type) {
    case 'RESTORE_CHARACTERS':
      return set2Array(action.charSet);
    case 'ADD_CHARACTER':
      const characters = state.slice(0).concat(action.characters);
      return set2Array(array2Set(characters));
    default:
      return state;
  }

}