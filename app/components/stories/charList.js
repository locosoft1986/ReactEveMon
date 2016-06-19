import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import {List} from 'react-toolbox';
import CharListItem from '../../components/UI/CharListItem';
import {charListItems} from './mocks';

storiesOf('Character Side List', module)
  .add('default', () => (
    <List>
      {charListItems.map(charInfo => <CharListItem key={charInfo.id} info={charInfo} onClick={action('selected', charInfo)}/>)}
    </List>
  ))
  .add('with item selected', () => (
    <List>
      {charListItems.map(charInfo =>
        <CharListItem key={charInfo.id} info={charInfo}
                      selected={charInfo.id === 1444080829} onClick={action('selected', charInfo)}/>)}
    </List>
  ));