export function load() {
  return {
    type: 'CHAR_LOAD'
  }
}

export function add() {
  return {
    type: 'CHAR_ADD'
  }
}

export function remove(id) {
  return {
    type: 'CHAR_REMOVE',
    id
  }
}

export function select(info) {
  return {
    type: 'CHAR_SELECT',
    info
  }
}