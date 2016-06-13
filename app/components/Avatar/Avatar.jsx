import React from 'react';
import style from './style.scss';
import avatar from '../../assets/images/default-avatar.png';

const Avatar = ({src}) => {
  return (
    <div className={style.avatar}>
      <img src={src || avatar} />
    </div>
  );
};

export default Avatar;