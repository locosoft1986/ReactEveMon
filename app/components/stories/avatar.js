import React from 'react';
import Avatar from '../../components/Avatar/Avatar'
import { storiesOf, action } from '@kadira/storybook';
import avatar from '../../assets/images/default-avatar.png';

storiesOf('Avatar', module)
  .add('default avatar', () => (
    <Avatar/>
  ))
  .add('with avatar url', () => (
    <Avatar src={'https://image.eveonline.com/Character/795194955_512.jpg'} />
  ));
