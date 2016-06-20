import React, {Component, PropTypes} from 'react'
import {Layout, Panel, NavDrawer, Button} from 'react-toolbox';
import AppBar from 'react-toolbox/lib/app_bar';
import Loading from '../UI/Loading';
import Error from '../UI/Error';
import CharList from './CharList';
import style from './MainLayout.scss';


class MainLayout extends Component{
  constructor(props) {
    super(props);
    this.state = {
      drawerActive: false,
      current: 0
    };
  }

  toggleDrawer = () => {
    this.setState({drawerActive: !this.state.drawerActive});
  };

  onSelectChar = (info) => {
    const {charActions} = this.props;
    this.setState({current: info.id});
    charActions.select(info);
  };

  render(){
    const {children, characters, drawerActiveAt, loading, errors, charActions} = this.props;
    const {drawerActive, current} = this.state;

    return(
      <Layout>
        <NavDrawer active={drawerActive} onOverlayClick={this.toggleDrawer} permanentAt={drawerActiveAt}>
          <Button className={style.addButton} icon='add' floating accent onClick={charActions.add}/>
          <CharList className={style.charList} characters={characters} selected={current} hint={'No Character Added'}
                    onSelect={this.onSelectChar}/>


        </NavDrawer>
        <Panel>
          <Loading loading={loading} timeout={1000}/>
          {children}
          <Error timeout={5000} error={errors.length > 0 ? errors[0] : null}/>
        </Panel>
      </Layout>
    );
  }
}


MainLayout.defaultProps = {
  characters: [],
  errors: [],
  drawerActiveAt: 'lg'
};

MainLayout.PropTypes = {
  characters : PropTypes.array.isRequired,
  drawerActiveAt: PropTypes.oneOf(['sm','md','lg','xl','xxl','xxxl']),
  loading: PropTypes.object,
  errors: PropTypes.array,
  charActions: PropTypes.object.isRequired
};


export default MainLayout;
