import React, {Component, PropTypes} from 'react';
import {AppBar, IconButton, Panel, Sidebar, Avatar, List, ListItem, Button} from 'react-toolbox';
import {Set} from 'immutable';
import classnames from 'classnames';
import {getAvatarUrl} from '../../consts';
import style from './ImportChar.scss'

const AVATAR_SIZE = 256;

export default class ImportChar extends Component {
  constructor(props) {
    super(props);
    this.state = {selectedCharSet: Set()};
  }

  isItemSelected() {
    const {selectedCharSet} = this.state;

    return selectedCharSet.size > 0;
  }


  handleImport = () => {
    const {selectedCharSet} = this.state;

    this.props.onImport(selectedCharSet.toArray());
  };

  onSelect = (char) => {
    return () => {
      const {selectedCharSet} = this.state;

      if(selectedCharSet.has(char.id)) {
        this.setState({selectedCharSet: selectedCharSet.remove(char.id)});
      } else {
        this.setState({selectedCharSet: selectedCharSet.add(char.id)});
      }
    };
  };

  render() {
    const {characters} = this.props;
    const {selectedCharSet} = this.state;

    const charItems = characters.map(char=>{
      const isSelected = selectedCharSet.has(char.id);
      const right = isSelected ? 'check' : undefined;
      const itemStyle = classnames({[style.listItem]: true, [style.selected]: isSelected});
      const avatar = getAvatarUrl(char.id, AVATAR_SIZE);
      return (
        <ListItem
          key={char.id}
          className={itemStyle}
          avatar={avatar}
          caption={char.name}
          rightIcon={right}
          onClick={this.onSelect(char)}
        />
      )
    });

    return (
      <div className={style.importChar}>
        <List className={style.charList}  selectable ripple>
          {charItems}
        </List>
        <section className={style.footer}>
          <Button label={'Import Character(s)'} onClick={this.handleImport} disabled={!this.isItemSelected()} raised accent/>
        </section>
      </div>
    );
  }

}

ImportChar.defaultProps = {
  characters: []
};

ImportChar.propTypes = {
  characters: PropTypes.array.isRequired,
  onImport: PropTypes.func.isRequired
};
