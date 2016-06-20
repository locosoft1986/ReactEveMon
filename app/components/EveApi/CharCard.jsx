import React, {PropTypes} from 'react'
import { Card, CardMedia, CardTitle, CardText } from 'react-toolbox/lib/card';
import classnames from 'classnames';
import isEqual from 'lodash/isEqual';
import intersection from 'lodash/intersection';
import {getAvatarUrl, AvatarType} from '../../consts';

import style from './CharCard.scss';

const PORTRAIT_SIZE = 256;

const CharCard = ({content, fields, ...props}) => {

  const {id, name, gender, DoB, race, bloodline, ancestry,
      accountBalance, skillPoints, shipName,
      shipTypeName, corporation,
      lastKnownLocation, securityStatus, paidUntil
    } = content;

  const portraitUrl = getAvatarUrl(id, PORTRAIT_SIZE, AvatarType.Character);

  const renderByField = (field, elements) => {
    if(fields.includes(field)) {
      return elements;
    }

    return null;
  };

  return(
    <Card {...props} className={style.card}>
      <div className={style.cardRow}>
        <CardMedia
          className={style.mediaLarge}
          image={portraitUrl}
        />
        <CardTitle
          title={name}
          subtitle={`${gender} - ${race} - ${bloodline} - ${ancestry}`}
        />
      </div>
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
  fields: ['birthday',
    'balance', 'skillPoints', 'ship',
    'corporation',
    'location', 'securityStatus', 'paidUntil']
};

CharCard.propTypes = {
  content: PropTypes.object.isRequired,
  fields: PropTypes.array
};

export default CharCard;