import React from 'react';
import {storiesOf, action} from '@kadira/storybook';
import Container from './Container';
import ImportChar from '../../components/EveApi/ImportChar';
import ApiForm from '../../components/EveApi/ApiForm';
import {characters} from './mocks';
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
    <Container>
      <ImportChar characters={characters} onImport={action('onImportChar')}/>
    </Container>
  ));