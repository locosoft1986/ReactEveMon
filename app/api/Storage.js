/*
 * Character set should contain character id to api object mapping:
 * {
 *  <id>: {
 *    key: 'Api key',
 *    code: 'Api code',
 *    accessMask: ''
 *  }
 * }
 */

class Storage {
  characters = null;

  get charSet(){
    if (!this.characters && typeof(localStorage) !== 'undefined'){
      const str = localStorage.getItem('characters');
      try{
        this.characters = JSON.parse(str);
      }
      catch(err){
        localStorage.removeItem('characters');
      }
    }
    return this.characters;
  }

  set charSet(chars){
    this.characters = chars;
    if (typeof(localStorage) !== 'undefined'){
      if (chars){
        localStorage.setItem('characters', JSON.stringify(chars));
      }else{
        localStorage.removeItem('characters');
      }
    }
  }
}

const storageInstance = new Storage();
export default storageInstance