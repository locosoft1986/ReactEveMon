import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import {List} from 'react-toolbox';
import CharManager from '../../components/layouts/CharManager';
import {characters} from './mocks';
import style from './style.scss';

storiesOf('Layouts', module)
  .add('character manager', () => {

    return (
      <CharManager characters={characters} onSelect={action('select character')}
                   onNewApi={action('import new character')}/>
    )
  });