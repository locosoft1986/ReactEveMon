import React from 'react';
import AppBar from 'react-toolbox/lib/app_bar';
import style from './Header.scss';

const Header = ({children}) => {
  return (
    <AppBar className={style.header} fixed>
      <h1 className={style.logo}>React EveMon</h1>
      { children }
    </AppBar>
  )
};

export default Header;