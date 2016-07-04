import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import {List} from 'react-toolbox';
import CharManager from '../../components/layouts/CharManager';
import {characters} from './mocks';
import style from './style.scss';

storiesOf('Layouts', module)
  .add('character manager', () => {
    const actions = {
      load: action('load characters')
    };

    return (
      <CharManager characters={characters} charActions={actions} onSelect={action('select character')}
                    onImport={action('import new character')}/>
    )
  });