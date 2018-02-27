import React, {Component} from 'react';
import logo from './images/logo.svg';
import './stylesheets/App.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {BrowserRouter as Router, Route} from "react-router-dom";

// Components
import Nav from './components/Nav'

class App extends Component {
  constructor() {
    super();
    this.state = {
      visible: true,
      sidebarVisibility: false
    };

    // Easier syntax
    this.toggleSidebar = this.toggleSidebar.bind(this);
  }

  toggleSidebar() {
    this.setState({
      sidebarVisibility: !this.state.sidebarVisibility
    });
  }

  toggleP() {
    console.log('halo')
    this.setState({
      visible: !this.state.visible
    });
  }

  render() {
    return (<div className="App">
      <Router>
        <div>
          <Nav toggleSidebar={this.toggleSidebar} active={this.state.sidebarVisibility}></Nav>
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
            <h1 className="App-title">Welcome to React</h1>
          </header>

          <ReactCSSTransitionGroup transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
            {
              this.state.visible && <p className="App-intro">
                  React test for Workout Partner
                </p>
            }
          </ReactCSSTransitionGroup>
          <button className="button is-primary" onClick={this.toggleP.bind(this)} style={{
              marginTop: '0.5rem'
            }}>
            Toggle text
          </button>
          {this.state.sidebarVisibility && <p> Sidebar would be visible now</p>}
        </div>
      </Router>
    </div>);
  }
}

export default App;
