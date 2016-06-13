import React,{Component, PropTypes} from 'react';
import classnames from 'classnames';
import style from './Badget.scss';

const Badget = ({mute, className, children})=>{
  return(
    <span className={classnames(style.badget, {[style.mute]:mute}, className)}>{children}</span>
  )
}

export default Badget
