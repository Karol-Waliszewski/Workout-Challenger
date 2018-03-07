import React, {Component} from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

// Components
import Nav from './Nav'
import Sidebar from './Sidebar'
import Header from './Header'
import Footer from './Footer'

class Layout extends Component {

  render() {
    return (<div className="App">

      <Router>
        <div>
          <Nav/>
          <Sidebar/>
          <Header/>
          <ReactCSSTransitionGroup transitionName="fade" transitionEnterTimeout={300} transitionLeaveTimeout={300} mountOnEnter={true} unmountOnExit={true}>
            {this.props.children}
          </ReactCSSTransitionGroup>
          <Footer/>
        </div>
      </Router>

    </div>);
  }
}

export default Layout;
