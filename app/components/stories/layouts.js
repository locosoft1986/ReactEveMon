import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import {List} from 'react-toolbox';
import MainLayout from '../../components/layouts/MainLayout';
import {charListItems} from './mocks';
import style from './style.scss'

storiesOf('Main Layout', module)
  .add('default', () => {
    const actions = {
      select: action('change character'),
      add: action('add character')
    };

    return (
      <div className={style.fullScreen}>
        <MainLayout characters={charListItems} charActions={actions}>
          <h5>Main Content</h5>
        </MainLayout>
      </div>
    )
  });