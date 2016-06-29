import React,{PropTypes} from 'react';
import { Card, CardMedia, CardTitle } from 'react-toolbox';
import {getAvatarUrl, AvatarType} from '../../consts';


const PORTRAIT_SIZE = 256;
const CharGridItem = ({character, onSelect, ...props}) => {
  const {id, name, gender, race, bloodline, ancestry} = character;
  const portraitUrl = getAvatarUrl(id, PORTRAIT_SIZE, AvatarType.Character);

  const onHandleClick = () => onSelect(character);

  return (
    <Card {...props} onClick={onHandleClick}>
      <CardMedia
        aspectRatio="wide"
        image={portraitUrl}
      />
      <CardTitle
        title={name}
        subtitle={`${gender} - ${race} - ${bloodline} - ${ancestry}`}
      />
    </Card>
  )
};

CharGridItem.propTypes = {
  character: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired
};

export default CharGridItem;