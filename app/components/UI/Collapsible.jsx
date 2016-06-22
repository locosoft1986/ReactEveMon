import React, {PropTypes, Component} from 'react';
import classnames from 'classnames';
import style from './Collapsible.scss';

class Collapsible extends Component {
  constructor(props) {
    super(props);
    if(this.props.open){
      this.state = {
        isClosed: false,
        shouldSwitchAutoOnNextCycle: false,
        height: 'auto',
        transition: 'none'
      };
    }
    else{
      this.state = {
        isClosed: true,
        shouldSwitchAutoOnNextCycle: false,
        height: 0,
        transition: 'height ' + this.props.transitionTime + 'ms ' + this.props.easing
      };
    }
  }

  // Taken from https://github.com/EvandroLG/transitionEnd/
  // Determines which prefixed event to listen for
  whichTransitionEnd(element) {
    const transitions = {
      'WebkitTransition' : 'webkitTransitionEnd',
      'MozTransition'    : 'transitionend',
      'OTransition'      : 'oTransitionEnd otransitionend',
      'transition'       : 'transitionend'
    };

    for(let t in transitions){
      if(element.style[t] !== undefined){
        return transitions[t];
      }
    }
  }

  componentDidMount() {
    //Set up event listener to listen to transitionend so we can switch the height from fixed pixel to auto for much responsiveness;
    //TODO:  Once Synthetic transitionend events have been exposed in the next release of React,
    //       move this funciton to a function handed to the onTransitionEnd prop

    this.refs.outer.addEventListener(this.whichTransitionEnd(this.refs.outer), this.transitionEnd);
  }

  componentWillUnmount() {
    this.refs.outer.removeEventListener(this.whichTransitionEnd(this.refs.outer), this.transitionEnd);
  }

  transitionEnd = () => {
    if(this.state.isClosed === false){
      this.setState({
        shouldSwitchAutoOnNextCycle: true
      });
    }

  };

  componentDidUpdate(prevProps) {

    if(this.state.shouldSwitchAutoOnNextCycle === true && this.state.isClosed === false) {
      //Set the height to auto to make compoenent re-render with the height set to auto.
      //This way the dropdown will be responsive and also change height if there is another dropdown within it.
      this.makeResponsive();
    }

    if(this.state.shouldSwitchAutoOnNextCycle === true && this.state.isClosed === true) {
      this.prepareToOpen();
    }

    //If there has been a change in the open prop (controlled by accordion)
    if(prevProps.open != this.props.open) {
      console.log('Open state changed!', this.props.accordionPosition);

      if(this.props.open === true) {
        this.openCollasible();
      }
      else {
        this.closeCollapsible();
      }
    }
  }


  handleTriggerClick = (event) => {

    event.preventDefault();

    if(this.props.handleTriggerClick) {
      this.props.handleTriggerClick(this.props.accordionPosition);
    }
    else{

      if(this.state.isClosed === true){
        this.openCollasible();
      }
      else {
        this.closeCollapsible();
      }
    }

  };

  closeCollapsible() {
    this.setState({
      isClosed: true,
      shouldSwitchAutoOnNextCycle: true,
      height: this.refs.inner.offsetHeight
    });
  }

  openCollasible() {
    this.setState({
      height: this.refs.inner.offsetHeight,
      transition: 'height ' + this.props.transitionTime + 'ms ' + this.props.easing,
      isClosed: false
    });
  }

  makeResponsive() {
    this.setState({
      height: 'auto',
      transition: 'none',
      shouldSwitchAutoOnNextCycle: false
    });
  }

  prepareToOpen() {
    //The height has been changes back to fixed pixel, we set a small timeout to force the CSS transition back to 0 on the next tick.
    window.setTimeout(() => {
      this.setState({
        height: 0,
        shouldSwitchAutoOnNextCycle: false,
        transition: 'height ' + this.props.transitionTime + 'ms ' + this.props.easing
      });
    }, 50);
  }

  render () {
    const dropdownStyle = {
      height: this.state.height,
      WebkitTransition: this.state.transition,
      msTransition: this.state.transition,
      transition: this.state.transition,
      overflow: 'hidden'
    };

    const {triggerTextWhenOpen, triggerText, triggerIcon, children} = this.props;

    const {isClosed} = this.state;
    const openClass = !!isClosed ? 'is-closed' : 'is-open';

    //If user wants different text when tray is open
    const titleText = !isClosed && (triggerTextWhenOpen !== undefined) ? triggerTextWhenOpen : triggerText;
    const triggerStyle = classnames({[style.trigger]: true, [openClass]: true});
    const iconStyle = classnames({'material-icons': true, [style.icon]: true, [style.iconOpen]: !isClosed});
    return(
      <div className={style.Collapsible}>
        <a href="#" className={triggerStyle}
           onClick={this.handleTriggerClick}>{titleText}<span className={iconStyle}>{triggerIcon}</span></a>
        <div className={style.contentOuter} ref='outer' style={dropdownStyle}>
          <div className={style.contentInner} ref='inner'>
            {children}
          </div>
        </div>
      </div>
    );
  }

}

Collapsible.defaultProps = {
  triggerIcon: 'keyboard_arrow_up',
  transitionTime: 400,
  easing: 'linear',
  open: false
};

Collapsible.propTypes = {
  transitionTime: PropTypes.number,
  triggerText: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  triggerTextWhenOpen: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  triggerIcon: PropTypes.string,
  easing: PropTypes.string,
  open: PropTypes.bool,
  accordionPosition: PropTypes.number,
  handleTriggerClick: PropTypes.func
};

export default Collapsible;