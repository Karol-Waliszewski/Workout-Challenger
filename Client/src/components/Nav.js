import React, {Component} from 'react';
import {NavLink} from "react-router-dom";

class Nav extends Component {

  constructor() {
    super();

    // Easier syntax
    this.toggleSidebar = this.toggleSidebar.bind(this);
  }

  toggleSidebar() {
    console.log('Sidebar has been toggled.')
    this.props.toggleSidebar();
  }

  render() {

    let {props} = this;
    return (<nav className="navbar is-fixed-top">
      <div className="navbar-brand">
        <a className="navbar-item" href="#">
          <img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28"/>
        </a>
        <button className={"button is-white navbar-burger " + (props.active ? 'is-active' : '')} onClick={this.toggleSidebar}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      <div className="navbar-menu">
        <div v-if="isUserLogged" className="navbar-end">
          <NavLink className="navbar-item" to="/">Settings</NavLink>
          <NavLink className="navbar-item" to="#">Logout</NavLink>
        </div>
      </div>
    </nav>)
  }
}

export default Nav;
