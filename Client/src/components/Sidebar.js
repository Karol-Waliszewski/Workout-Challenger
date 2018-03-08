import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {CLOSE_SIDEBAR} from '../actions/sidebarActions';
import {AUTHENTICATE_LOGOUT} from '../actions/authActions';
import {NavLink} from 'react-router-dom'

class Sidebar extends Component {

  render() {
    var {
      props
    } = this;
    if (props.sidebarEnabled)
      return (<aside className={"menu sidebar is-p-2 is-p-t-3 " + (
          props.sidebarActive
          ? 'is-active'
          : '')}>
        <p className="menu-label">
          General
        </p>
        <ul className="menu-list">
          <li>
            <NavLink to="/" onClick={props.closeSidebar}>Home</NavLink>
          </li>
          <li>
            <NavLink to="/login" onClick={props.closeSidebar}>Login</NavLink>
            <span className="icon is-small is-angle">
              <span className="fas fa-angle-down"></span>
            </span>
            <ul>
              <li>
                <NavLink to="/exercises" onClick={props.closeSidebar}>List of exercises</NavLink>
              </li>
              <li>
                <NavLink to="/exercises/creator" onClick={props.closeSidebar}>Add new one</NavLink>
              </li>
            </ul>
          </li>
          <li>
            <NavLink to="/tester" onClick={props.closeSidebar}>Tester</NavLink>
          </li>
        </ul>
        <p className="menu-label">
          Statistics
        </p>
        <ul className="menu-list">
          <li>
            <NavLink to="/statistics" onClick={props.closeSidebar}>General</NavLink>
          </li>
          <li>
            <NavLink to="/statistics/elements" onClick={props.closeSidebar}>Elements progress</NavLink>
          </li>
          <li>
            <NavLink to="/statistics/creator" onClick={props.closeSidebar}>Elements progress</NavLink>
          </li>
        </ul>
        <p className="menu-label is-hidden-desktop">
          User
        </p>
        <ul className="menu-list is-hidden-desktop">
          <li>
            <NavLink to="/settings" onClick={props.closeSidebar}>Settings</NavLink>
          </li>
          <li>
            <NavLink to="/login" onClick={() => {
                props.logout();
                props.closeSidebar()
              }}>Logout</NavLink>
          </li>
        </ul>
      </aside>)
    else
      return (null)
  }
}

function mapStateToProps(state) {
  return {
    ...state.sidebar
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    closeSidebar: CLOSE_SIDEBAR,
    logout: AUTHENTICATE_LOGOUT
  }, dispatch);
}

var SidebarContainer = connect(mapStateToProps, mapDispatchToProps)(Sidebar)

export default SidebarContainer;
