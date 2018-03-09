import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {TransitionGroup, CSSTransition} from "react-transition-group";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ENABLE_SIDEBAR, DISABLE_SIDEBAR} from '../actions/sidebarActions';
import {ROUTE_CHANGED} from '../actions/routerActions';

// Components
import Nav from './Nav'
import Sidebar from './Sidebar'
import Header from './Header'
import Footer from './Footer'

class Layout extends Component {
  render() {
    // TODO CHANGE CLASSNAME (?)
    let {props} = this;
    return (<div className="App">
      <Router>
        <Route render={({location}) => {

            props.setCurrentRoute(location.pathname);
            if (props.routesWithoutSidebar.includes(props.currentRoute))
              props.disableSidebar();
            else
              props.enableSidebar();

            return (<div>
              <Nav/>
              <Sidebar/>
              <Header/>
              <TransitionGroup>
                <CSSTransition key={location.key} classNames="RouterTransition" timeout={350}>
                  <div>
                    <Switch key={location.key} location={location}>
                      {props.children}
                    </Switch>
                  </div>
                </CSSTransition>
              </TransitionGroup>
              <Footer/>
            </div>)
          }}></Route>
      </Router>
    </div>);
  }
}

function mapStateToProps(state) {
  return {
    ...state.router
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    enableSidebar: ENABLE_SIDEBAR,
    disableSidebar: DISABLE_SIDEBAR,
    setCurrentRoute: ROUTE_CHANGED
  }, dispatch);
}

var LayoutContainer = connect(mapStateToProps, mapDispatchToProps)(Layout)

export default LayoutContainer;
