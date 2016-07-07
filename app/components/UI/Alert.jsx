import React,{Component, PropTypes} from 'react';
import classnames from 'classnames';
import style from './Badget.scss';

const Alert = ({className, children})=>{
  return(
    <div className={classnames(style.badget, className)}>
      {children}
    </div>
  )
};

export default Alert