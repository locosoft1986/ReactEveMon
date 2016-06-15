import React, {PropTypes} from 'react'
import { Card, CardMedia, CardTitle, CardText } from 'react-toolbox/lib/card';
import classnames from 'classnames';
import isEqual from 'lodash/isEqual';
import intersection from 'lodash/intersection';
import {getAvatarUrl, AvatarType} from '../../consts';

const AVATAR_SIZE = 256;
const PORTRAIT_SIZE = 512;

const CharCard = ({content, fields, style}) => {

  const {id, name, gender, DoB, race, bloodline, ancestry,
      accountBalance, skillPoints, shipName,
      shipTypeName, corporation,
      lastKnownLocation, securityStatus, paidUntil
    } = content;

  const portraitUrl = getAvatarUrl(id, PORTRAIT_SIZE, AvatarType.Character);
  const avatarUrl = getAvatarUrl(id, AVATAR_SIZE, AvatarType.Character);

  const renderByField = (field, elements) => {
    if(fields.includes(field)) {
      return elements;
    }

    return null;
  };

  return(
    <Card style={style}>
      {renderByField('portrait', <CardMedia
        aspectRatio="square"
        image={portraitUrl}
      />)}
      <CardTitle
        avatar={fields.includes('portrait') ? null : avatarUrl}
        title={name}
        subtitle={`${gender} - ${race} - ${bloodline} - ${ancestry}`}
      />

      {renderByField('balance', <CardText>{`Balance: ${accountBalance} ISK`}</CardText>)}
      {renderByField('birthday', <CardText>{`Birthday: ${DoB}`}</CardText>)}
      {renderByField('skillPoints', <CardText>{`Skill Points: ${skillPoints}`}</CardText>)}
      {renderByField('ship', <CardText>{`Active Ship: ${shipName} [${shipTypeName}]`}</CardText>)}
      {renderByField('corporation', <CardText>{`Corporation: ${corporation}`}</CardText>)}
      {renderByField('location', <CardText>{`Current Location: ${lastKnownLocation}`}</CardText>)}
      {renderByField('securityStatus', <CardText>{`Security Status: ${securityStatus}`}</CardText>)}
      {renderByField('paidUntil',  <CardText>{`Paid Until: ${paidUntil}`}</CardText>)}
    </Card>
  );

};

CharCard.defaultProps ={
  content: {
    id: 0,
    name: '',
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
  },
  fields: ['portrait', 'birthday',
    'balance', 'skillPoints', 'ship',
    'corporation',
    'location', 'securityStatus', 'paidUntil']
};

CharCard.propTypes = {
  content: PropTypes.object.isRequired,
  fields: PropTypes.array
};

export default CharCard;