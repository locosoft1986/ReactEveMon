import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import CharManager from '../components/layouts/CharManager.jsx';
import {appActions} from '../actions';


function mapStateToProps(state, ownProps){
  const {characters} = state;

  return {
    characters,
    onSelect: char => {
      appActions.to(`/character/${char.characterID}`)
    }
  }
}

function mapDispatch(dispatch) {
  return {
    onNewApi: bindActionCreators(appActions.newApi, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatch)(CharManager);