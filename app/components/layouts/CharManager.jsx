import React, {Component, PropTypes} from 'react'
import {Layout, Panel} from 'react-toolbox';
import {CharGrid, Header, CharFilterBar} from '../UI';
import style from './CharManager.scss';


class CharManager extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  componentDidMount() {
    const {charActions: {load}} = this.props;
    load();
  }

  onFilterChange = (value) => {
    this.setState({ filter: value });
  };

  filterCharacters = (name, characters) => {
    const regex = RegExp(name, 'i');
    return characters.filter(char => regex.test(char.name));
  };

  render() {
    const { filter } = this.state;
    const { characters, onSelect } = this.props;
    const filteredCharacters = this.filterCharacters(filter, characters);

    return (
      <div className={style.fullScreen}>
        <Header>
          <span className={style.title}>Choose Character</span>
        </Header>
        <div className={style.filter}>
          <CharFilterBar onFilterChange={this.onFilterChange} />
        </div>
        <Panel className={style.inner}>
          <CharGrid characters={filteredCharacters} onSelect={onSelect} />
        </Panel>
      </div>
    )
  }
}


CharManager.PropTypes = {
  characters: PropTypes.array.isRequired,
  charActions: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired
};


export default CharManager;