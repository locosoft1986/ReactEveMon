import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import AppWrapper from '../components/layouts/AppWrapper';
import {charActions} from 'actions';


function mapStateToProps(state, ownProps){
  const {views:{app:{requests, errors}, apiform}} = state;

  return {
    loading: requests.length > 0 ? {type: requests[0], message:requests[0]} : null,
    errors,
    apiform
  }
}

export default connect(mapStateToProps)(AppWrapper);