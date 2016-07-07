import React, {Component, PropTypes} from 'react'
import {Layout, Panel, NavDrawer, Button} from 'react-toolbox';
import AppBar from 'react-toolbox/lib/app_bar';
import Loading from '../UI/Loading';
import Error from '../UI/Error';
import CharList from './CharList';
import style from './MainLayout.scss';

const AppWrapper = ({loading, errors, children}) => {
  return (
    <div>
      {children}
      <Loading loading={loading} timeout={1000}/>
      <Error timeout={5000} error={errors.length > 0 ? errors[0] : null}/>
    </div>
  )
};

AppWrapper.defaultProps = {
  errors: []
};

AppWrapper.PropTypes = {
  loading: PropTypes.object,
  errors: PropTypes.array
};


export default AppWrapper;
