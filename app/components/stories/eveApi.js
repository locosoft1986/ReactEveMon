import React from 'react';
import {storiesOf, action} from '@kadira/storybook';
import Container from './container';
import ImportChar from '../../components/EveApi/ImportChar';
import CharCard from '../../components/EveApi/CharCard';
import {characters, characterBasicInfo} from './mocks';
import '../../assets/styles/material-icons.css';
import '../../assets/styles/roboto.css';


storiesOf('EVE API', module)
  .add('Characters Selection', () => (
    <div>
      <ImportChar characters={characters.slice(0, 3)} onImport={action('onImportChar')} onCancel={action('onCancelImport')}/>
    </div>
  ));



storiesOf('Character Card', module)
  .add('default', () => (
    <div style={{width: '30%'}}>
      <CharCard content={characterBasicInfo} />
    </div>
  ))
  .add('selected', () => (
    <div style={{width: '30%'}}>
      <CharCard content={characterBasicInfo} selected={true} />
    </div>
  ));