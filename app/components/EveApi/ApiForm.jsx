import React, {Component, PropTypes} from 'react'
import { Button } from 'react-toolbox/lib/button';
import Input from 'react-toolbox/lib/input';
import style from './ApiForm.scss';
import classnames from 'classnames'
import isEqual from 'lodash/isEqual'
import intersection from 'lodash/intersection'

const fields = ['key', 'code'];

export default class ApiForm extends Component {

  constructor(props) {
    super(props);
    this.state = {content: props.formContent}
  }

  componentWillReceiveProps(newProps) {
    if (newProps.formContent != this.props.formContent) {
      this.setState({content: newProps.formContent});
    }
  }

  isRequiredFilled() {
    const {content} = this.state;

    const invalidFields = intersection(['key', 'code'], fields).filter((field) => {
      const value = content[field];
      return !value || value.trim().length === 0;
    });
    return invalidFields.length == 0;
  }

  handleChangeValue = (prop, value) => {
    let {content} = this.state;
    this.setState({content: Object.assign({}, content, {[prop]: value})});
  };


  handleSubmit = () => {
    const {content} = this.state;

    let result = fields.reduce((result, field) => {
      const value = content[field];
      if (value && value.trim().length > 0) {
        result[field] = value
      }
      return result;
    }, {});

    this.props.onSubmit(result);
  };

  render() {
    const {content:{key, code}} = this.state;
    const {label, onCancel} = this.props;

    return(
      <div className={style.apiForm}>
        <Input key="key" type='text' icon='lock' label='Api Key' value={key} onChange={this.handleChangeValue.bind(this, "key")} required/>
        <Input key="code" type='text' icon='code' label='Api Code' value={code} onChange={this.handleChangeValue.bind(this, "code")} required/>
        <section className={style.footer}>
          <Button label={'Cancel'} onClick={onCancel} flat/>
          <Button label={label} onClick={this.handleSubmit} disabled={!this.isRequiredFilled()} raised accent/>
        </section>
      </div>
    );
  }
}

ApiForm.defaultProps = {
  formContent: {
    key: "",
    code: ""
  }
};

ApiForm.propTypes = {
  formContent: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};
