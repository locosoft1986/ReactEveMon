import React, {Component, PropTypes} from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ProgressBar from 'react-toolbox/lib/progress_bar';
import style from './Loading.scss'

class Loading extends Component{
  state = {
    loading: null
  };

  componentDidMount(){
    if(this.props.loading){
      this.waitForLoading(this.props.loading);
    }
  }

  componentWillReceiveProps(newProps){
    if(newProps.loading !== this.props.loading){
      this.waitForLoading(newProps.loading);
    }
  }

  waitForLoading(newLoading){
    let { timeoutId, loading } = this.state;

    if(newLoading){
      if(loading){
        // change loading
        this.setState({loading: newLoading});
      }else{
        if(timeoutId){
          // pending loading already started
          return;
        }
        // start loading
        const {timeout} = this.props;
        timeoutId = setTimeout(()=>{
          this.setState({loading: this.props.loading, timeoutId:null});
        }, timeout);
        this.setState({timeoutId})
      }
    }else{
      if(loading){
        // stop active loading
        this.setState({loading: null, timeoutId: null});
      }else{
        if(timeoutId){
          // clear pending loading
          clearTimeout(timeoutId);
          this.setState({timeoutId: null});
        }
      }
    }
  }

  render(){
    const {loading} = this.state;
    return(
      <div className={style.loadingContainer} style={{display: loading?'block':'none'}}>
        <ReactCSSTransitionGroup transitionName="fade" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
          {
            !!loading ?
            <div key="loading" className={style.loading}>
              <ProgressBar type="circular" mode="indeterminate" multicolor/>
              {!!loading.message ? <p>{loading.message}</p> : null}
            </div> : null
          }
        </ReactCSSTransitionGroup>
      </div>
    )
  }
}

Loading.defaultProps = {
  timeout : 1000
};

Loading.propTypes = {
  timeout: PropTypes.number.isRequired
};

export default Loading;
