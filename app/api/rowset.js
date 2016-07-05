'use strict';

export default (json) => {
  let cloned = Object.assign({}, json);
  delete cloned.rowset;

  if(!!json && !!json.rowset) {
    cloned[json.rowset.name] = [];

    if(Array.isArray(json.rowset.row)) {
      cloned[json.rowset.name] = json.rowset.row.slice(0);
    } else if(typeof json.rowset.row === 'object') {
      cloned[json.rowset.name] = [Object.assign({}, json.rowset.row)];
    }

    return cloned;
  }

  return json;
};