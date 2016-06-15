import React, {PropTypes} from 'react';
import style from './style.scss';
import {getAvatarUrl} from '../../consts';

const Avatar = ({id, size, type}) => {
  return (
    <div className={style.avatar}>
      <img src={getAvatarUrl(id, size, type)} />
    </div>
  );
};

Avatar.propTypes = {
  id: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired
};

export default Avatar;