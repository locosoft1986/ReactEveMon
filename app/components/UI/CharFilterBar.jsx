import React, { Component, PropTypes } from 'react';
import Input from 'react-toolbox/lib/input';
import { debounce } from 'lodash';
import style from './CharFilterBar.scss';


class CharFilterBar extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {value: ''};
  }

  componentWillMount () {
    this.delayedCallback = debounce(this.props.onFilterChange, 200);
  }

  onFilterChange = (value) => {
    this.delayedCallback(value);
    this.setState({value})
  };

  onCancel = (event) => {
    event.preventDefault();

    this.setState({value: ''});
    this.props.onFilterChange('');
  };

  render () {
    const {value} = this.state;

    return (
      <div className={style.container}>
        <Input type='text' label='Search...'
               onChange={this.onFilterChange} icon='search' value={value} {...this.props} />

        {(value.length > 0) && <div className={style.cancel}>
          <span className='material-icons' onClick={this.onCancel}>close</span>
        </div>}
      </div>
    );
  }
}

CharFilterBar.propTypes = {
  onFilterChange: PropTypes.func.isRequired
};

export default CharFilterBar;