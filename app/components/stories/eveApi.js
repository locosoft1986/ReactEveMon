import React from 'react';
import {storiesOf, action} from '@kadira/storybook';
import Container from './container';
import ImportChar from '../../components/EveApi/ImportChar';
import ApiForm from '../../components/EveApi/ApiForm';
import CharCard from '../../components/EveApi/CharCard';
import {characters, characterBasicInfo} from './mocks';
import '../../assets/styles/material-icons.css';
import '../../assets/styles/roboto.css';


storiesOf('EVE API', module)
  .add('default', () => (
    <Container>
      <ApiForm
        formContent={{key:"", code:""}}
        onSubmit={action('submitApi')}
        label="Import API"
      />
    </Container>
  ))
  .add('Characters Selection', () => (
    <div>
      <ImportChar characters={characters} onImport={action('onImportChar')} onCancel={action('onCancelImport')}/>
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