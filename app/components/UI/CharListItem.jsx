import React, {PropTypes} from 'react';
import {ListItem, ListItemContent, ListItemText} from 'react-toolbox';
import Avatar from '../Avatar/Avatar';
import classnames from 'classnames';
import {AvatarType} from '../../consts';
import style from './CharListItem.scss';

const CharListItem = ({info, selected, onClick, ...props}) => {
  const {characterID, characterName, balance, location, currentSkill, remainingTime} = info;

  const onSelected = () => {
    onClick(info);
  };

  const itemStyle = classnames({[style.listItem]: true, [style.selected]: !!selected});

  return (
    <ListItem className={itemStyle} onClick={onSelected} {...props}>
      <Avatar id={characterID} size={256} type={AvatarType.Character}/>
      <ListItemContent>
        <ListItemText primary>{characterName}</ListItemText>
        <ListItemText primary>{location}</ListItemText>
        <ListItemText>{balance}</ListItemText>

        {!!currentSkill ? <ListItemText primary>{currentSkill}</ListItemText> :
          <ListItemText>{'Not Training'}</ListItemText>}

        {!!currentSkill ? <ListItemText primary>{remainingTime}</ListItemText> :
          <ListItemText>{' '}</ListItemText>}

      </ListItemContent>
    </ListItem>
  );
};

CharListItem.propTypes = {
  info: PropTypes.object.isRequired,
  selected: PropTypes.bool,
  onClick: PropTypes.func
};

export default CharListItem;