import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import AppWrapper from '../components/layouts/AppWrapper';
import {appActions} from '../actions';


function mapStateToProps(state, ownProps){
  const {views:{app:{requests, errors}, apiform}} = state;

  return {
    loading: requests.length > 0 ? {type: requests[0], message:requests[0]} : null,
    errors,
    apiform
  }
}

function mapDispatch(dispatch) {
  return {
    onApiSubmit: bindActionCreators(appActions.apiImport, dispatch),
    onApiCancel: bindActionCreators(appActions.newApiCancel, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatch)(AppWrapper);