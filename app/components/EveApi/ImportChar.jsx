import React, {Component, PropTypes} from 'react';
import {List, ListItem, Button} from 'react-toolbox';
import CharCard from './CharCard';
import {Set} from 'immutable';
import classnames from 'classnames';
import style from './ImportChar.scss'


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
    const {characters, onCancel} = this.props;
    const {selectedCharSet} = this.state;

    const charItems = characters.map((char, index) =>{
      const isSelected = selectedCharSet.has(char.id);
      return (
        <div key={index} className={style.col}>
          <CharCard
            className={style.item}
            content={char}
            selected={isSelected}
            onClick={this.onSelect(char)}
          />
        </div>
      )
    });

    return (
      <div className={style.container}>
        <div className={style.importChar}>
          {charItems}
        </div>
        <div className={style.footer}>
          <div className={style.actions}>
            <Button label={'Cancel'} onClick={onCancel} flat/>
            <Button label={'Import Character(s)'} onClick={this.handleImport} disabled={!this.isItemSelected()} raised accent/>
          </div>
        </div>
      </div>
    );
  }

}

ImportChar.defaultProps = {
  characters: []
};

ImportChar.propTypes = {
  characters: PropTypes.array.isRequired,
  onImport: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};



