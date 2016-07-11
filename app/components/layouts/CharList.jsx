import React, {PropTypes} from 'react';
import {List, ListItem} from 'react-toolbox';
import CharListItem from '../UI/CharListItem';
import style from './CharList.scss';

const CharList = ({characters, hint, selected, onSelect, ...props}) => {
  const items = characters.length > 0 ? characters.map((info, index) => {
                  return <CharListItem key={index} info={info} selected={info.characterID === selected} onClick={onSelect}/>
                }) : (<div>{hint}</div>);

  return (
    <List {...props}>
      {items}
    </List>
  );
};

CharList.defaultProps = {
  characters: []
};

CharList.propTypes = {
  characters: PropTypes.array,
  hint: PropTypes.string,
  selected: PropTypes.number,
  onSelect: PropTypes.func
};

export default CharList;