import React, {Component} from 'react';
import {BrowserRouter as Router} from "react-router-dom";

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
          {this.props.children}
          <Footer/>
        </div>
      </Router>
    </div>);
  }
}

export default Layout;
