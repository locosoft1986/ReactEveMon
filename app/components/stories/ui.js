import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import {List} from 'react-toolbox';
import Collapsible from '../../components/UI/Collapsible';
import CharList from '../../components/layouts/CharList';
import {charListItems} from './mocks';

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
  ));