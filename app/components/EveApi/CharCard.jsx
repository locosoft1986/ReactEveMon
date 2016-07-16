import React, {PropTypes} from 'react'
import { Card, CardMedia, CardTitle, CardText } from 'react-toolbox';
import FontIcon from 'react-toolbox/lib/font_icon';
import classnames from 'classnames';
import isEqual from 'lodash/isEqual';
import intersection from 'lodash/intersection';
import {getAvatarUrl, AvatarType} from '../../consts';

import style from './CharCard.scss';

const PORTRAIT_SIZE = 512;

const CharCard = ({content, selected, ...props}) => {

  const {characterID, characterName, gender, DoB, race, bloodline, ancestry,
      balance, skills,
      corporationName,
      lastKnownLocation
    } = content;

  const portraitUrl = getAvatarUrl(characterID, PORTRAIT_SIZE, AvatarType.Character);
  const skillPoints = skills.reduce((memo, skill) => memo + parseInt(skill.skillpoints), 0);

  return(
    <div className={style.container}>
      <Card {...props} className={style.card}>
        <CardMedia
          aspectRatio="square"
          image={portraitUrl}
        />
        <CardTitle
          title={characterName}
          subtitle={`${gender} - ${race} - ${bloodline} - ${ancestry}`}
        />
        <CardText>{`Balance: ${balance} ISK`}</CardText>
        <CardText>{`Birthday: ${DoB}`}</CardText>
        <CardText>{`Skill Points: ${skillPoints}`}</CardText>
        <CardText>{`Corporation: ${corporationName}`}</CardText>
        <CardText>{`Current Location: ${lastKnownLocation}`}</CardText>
      </Card>
      {!!selected && <FontIcon className={style.check} value="check_circle"/> }
    </div>

  );

};

CharCard.defaultProps ={
  content: {
    characterID: 0,
    characterName: '',
    gender: '',
    DoB: '',
    race: '',
    bloodline: '',
    ancestry: '',
    accountBalance: 0,
    skillPoints: 0,
    shipName: '',
    shipTypeName: '',
    corporation: '',
    lastKnownLocation: '',
    securityStatus: '0.0',
    paidUntil: ''
  }
};

CharCard.propTypes = {
  content: PropTypes.object.isRequired,
  selected: PropTypes.bool
};

export default CharCard;