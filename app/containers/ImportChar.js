import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ImportChar from '../components/EveApi/ImportChar';
import {charActions, appActions} from '../actions';


function mapStateToProps(state, ownProps){
  const {views:{importChar: {characters}}} = state;

  return {
    characters
  }
}

function mapDispatch(dispatch) {
  return {
    onImport: bindActionCreators(charActions.add, dispatch),
    onCancel: bindActionCreators(appActions.back, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatch)(ImportChar);