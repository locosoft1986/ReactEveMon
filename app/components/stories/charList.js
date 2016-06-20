import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import {List} from 'react-toolbox';
import CharList from '../../components/layouts/CharList';
import {charListItems} from './mocks';

storiesOf('Character Side List', module)
  .add('default', () => (
    <CharList characters={charListItems} onSelect={action('selected')} />
  ))
  .add('with item selected', () => (
    <CharList characters={charListItems} selected={1444080829} onSelect={action('selected')} />
  ))
  .add('with no items', () => (
    <CharList characters={[]} hint={'Here is a test hint'} selected={1444080829} onSelect={action('selected')} />
  ));