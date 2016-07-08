const initState = [];

export default function characters(state=initState, action) {

  switch(action.type) {
    case 'RESTORE_CHARACTERS':
      const characters = Object.keys(action.charSet).reduce((memo, char) => {
        memo.push(char);
        return memo;
      }, []);
      return characters;
    default:
      return state;
  }

}