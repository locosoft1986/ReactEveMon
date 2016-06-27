import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import MainLayout from '../components/layouts/MainLayout';
import {charActions} from 'actions';


function mapStateToProps(state, ownProps){
  const {views:{app:{requests, errors}}, characters} = state;

  return {
    characters,
    loading: requests.length > 0 ? {type: requests[0], message:requests[0]} : null,
    errors
  }
}

function mapDispatchToProps(dispatch){
  return{
    charActions: bindActionCreators(charActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);