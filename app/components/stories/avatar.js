import React from 'react';
import Avatar from '../../components/Avatar/Avatar'
import { storiesOf, action } from '@kadira/storybook';
import {AvatarType} from '../../consts';

storiesOf('Avatar', module)
  .add('character avatar', () => (
    <Avatar id={795194955} size={256} type={AvatarType.Character}/>
  ))
  .add('corporation avatar', () => (
    <Avatar id={1097611545} size={256} type={AvatarType.Corporation}/>
  ))
  .add('alliance avatar', () => (
    <Avatar id={99003581} size={128} type={AvatarType.Alliance}/>
  ))
  .add('inventory avatar', () => (
    <Avatar id={14264} size={64} type={AvatarType.Inventory}/>
  ))
  .add('ship avatar', () => (
    <Avatar id={17738} size={256} type={AvatarType.Ship}/>
  ))
  .add('drone avatar', () => (
    <Avatar id={23059} size={256} type={AvatarType.Ship}/>
  ));
