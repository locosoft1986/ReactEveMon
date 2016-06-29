import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import {List} from 'react-toolbox';
import Collapsible from '../../components/UI/Collapsible';
import CharGrid from '../../components/UI/CharGrid';
import CharList from '../../components/layouts/CharList';
import {characters, charListItems} from './mocks';

storiesOf('UI', module)
  .add('Collapsible with List', () => (
    <div style={{position: 'relative', display: 'block'}}>
      <Collapsible triggerText='This is a Test A'>
        <CharList characters={charListItems} onSelect={action('selected A')} />
      </Collapsible>
      <Collapsible triggerText='This is a Test B' open={true}>
        <CharList characters={charListItems} onSelect={action('selected B')} />
      </Collapsible>
      <Collapsible triggerText='This is a Test C'>
        <CharList characters={charListItems} onSelect={action('selected C')} />
      </Collapsible>
      <Collapsible triggerText='This is a Test D'>
        <CharList characters={charListItems} onSelect={action('selected D')} />
      </Collapsible>
    </div>
  ))
  .add('Character grid', () => (
    <div style={{position: 'relative', display: 'block'}}>
      <CharGrid characters={characters} onSelect={action('Selected')} />
    </div>
  ));