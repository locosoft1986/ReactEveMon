import React from 'react'
import {storiesOf} from '@kadira/storybook';
import Badget from '../../components/UI/Badget';
import Container from './Container'

storiesOf('Badget', module)
  .add('default', () => (
    <Container>
      <ul style={{listStyle: 'none'}}>
        <li><Badget>1</Badget></li>
        <li><Badget>12</Badget></li>
        <li><Badget>100</Badget></li>
        <li><Badget>Text Content</Badget></li>
        <li><Badget mute>1</Badget></li>
        <li><Badget mute>muted</Badget></li>
      </ul>
    </Container>
  ));