import React, { Component } from 'react';
import { render } from 'react-dom';

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