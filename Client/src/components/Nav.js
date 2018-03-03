import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {TOGGLE_SIDEBAR} from '../actions/sidebarActions';

class Nav extends Component {

  render() {
    let {props} = this;
    return (<nav className="navbar is-fixed-top">
      <div className="navbar-brand">
        <a className="navbar-item" href="#">
          <img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28"/>
        </a>
        {props.sidebarEnabled && <button className={"button is-white navbar-burger " + (props.navbarActive ? 'is-active' : '')} onClick={()=>{props.toggleSidebar()}}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      }
      </div>
      <div className="navbar-menu">
        <div v-if="isUserLogged" className="navbar-end">
          <NavLink className="navbar-item" to="/logout">Logout</NavLink>
        </div>
      </div>
    </nav>)
  }
}


function mapStateToProps(state) {
  return {
    navbarActive: state.sidebar.sidebarActive,
    sidebarEnabled: state.sidebar.sidebarEnabled
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    toggleSidebar: TOGGLE_SIDEBAR
  }, dispatch);
}

var NavContainer = connect(mapStateToProps, mapDispatchToProps)(Nav)

export default NavContainer;
