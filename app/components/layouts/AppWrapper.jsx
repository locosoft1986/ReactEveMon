import React, {Component, PropTypes} from 'react'
import {Layout, Panel, NavDrawer, Button} from 'react-toolbox';
import AppBar from 'react-toolbox/lib/app_bar';
import Loading from '../UI/Loading';
import Error from '../UI/Error';
import ApiForm from '../UI/ApiForm';
import CharList from './CharList';
import style from './AppWrapper.scss';

const AppWrapper = ({loading, errors, children, onApiSubmit, onApiCancel, apiform: {active, busy}}) => {
  return (
    <div className={style.wrapper}>
      {children}
      <Loading loading={loading} timeout={1000}/>
      <Error timeout={5000} error={errors.length > 0 ? errors[0] : null}/>
      <ApiForm active={active} busy={busy} onSubmit={onApiSubmit} onCancel={onApiCancel}/>
    </div>
  )
};

AppWrapper.defaultProps = {
  errors: []
};

AppWrapper.PropTypes = {
  loading: PropTypes.object,
  errors: PropTypes.array,
  onApiSubmit: PropTypes.func.isRequired,
  onApiCancel: PropTypes.func.isRequired
};


export default AppWrapper;
