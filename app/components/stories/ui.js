import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import {List} from 'react-toolbox';
import {Collapsible, CharGrid, Header, CharFilterBar} from '../../components/UI';
import CharList from '../../components/layouts/CharList';
import {characters, charListItems} from './mocks';
import style from './style.scss';

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
  ))
  .add('Header', () => (
    <Header>
      <span className={style.breadcrumb}>Root / Test</span>
    </Header>
  ))
  .add('CharFilterBar', () => (
    <CharFilterBar onFilterChange={() => {}}/>
  ));