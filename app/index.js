import React, { Component } from 'react';
import { render } from 'react-dom';

import './assets/styles/material-icons.css';
import './assets/styles/roboto.css';
import './assets/styles/commons.scss';
import './assets/styles/transitions.css';
import './assets/styles/app.scss';


class Home extends Component {
  render() {
    return (
      <div>
          <h2>Home</h2>
      </div>
    );
  }
}

render(
  <Home />,
  document.getElementById('root')
);