import React, {Component, PropTypes} from 'react';
import { Snackbar } from 'react-toolbox';

export default class Error extends Component {
  constructor(props){
    super(props);
    this.state = this.errorState(props.error)
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.error != this.props.error){
      this.setState(this.errorState(nextProps.error))
    }
  }

  errorState(error){
    if(error){
      const message = error.error ? error.error : error.toString();
      return {active: true, message}
    }else{
      return {active: false, message: ""}
    }
  }

  handleDismiss = () => {
    this.setState({ active: false });
  };

  render(){
    const {timeout} = this.props;
    const {active, message} = this.state;
    return (
      <Snackbar
        action='Dismiss'
        active={active}
        icon='error'
        label={message}
        timeout={timeout}
        onClick={this.handleDismiss}
        onTimeout={this.handleDismiss}
        type='warning'
      />
    )
  }
}
