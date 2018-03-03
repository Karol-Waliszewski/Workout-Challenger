import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {CLOSE_SIDEBAR} from '../actions/sidebarActions';
import {NavLink} from 'react-router-dom'

class Sidebar extends Component {

  render() {
    var {
      props
    } = this;
    if (props.sidebarEnabled)
      return (<aside className={"menu sidebar is-p-2 is-p-t-3 " + (props.sidebarActive ? 'is-active' : '')}>
        <p className="menu-label">
          General
        </p>
        <ul className="menu-list">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/exercises">Exercises</NavLink>
            <span className="icon is-small is-angle">
              <span className="fas fa-angle-down"></span>
            </span>
            <ul>
              <li>
                <NavLink to="/exercises">List of exercises</NavLink>
              </li>
              <li>
                <NavLink to="/exercises/creator">Add new one</NavLink>
              </li>
            </ul>
          </li>
          <li>
            <NavLink to="/trainings">Workouts</NavLink>
          </li>
        </ul>
        <p className="menu-label">
          Statistics
        </p>
        <ul className="menu-list">
          <li>
            <NavLink to="/statistics">General</NavLink>
          </li>
          <li>
            <NavLink to="/statistics/elements">Elements progress</NavLink>
          </li>
          <li>
            <NavLink to="/statistics/creator">Elements progress</NavLink>
          </li>
        </ul>
        <p className="menu-label is-hidden-desktop">
          User
        </p>
        <ul className="menu-list is-hidden-desktop">
          <li>
            <NavLink to="/settings">Settings</NavLink>
          </li>
          <li>
            <a href="/logout">Logout</a>
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
    closeSidebar: CLOSE_SIDEBAR
  }, dispatch);
}

var SidebarContainer = connect(mapStateToProps, mapDispatchToProps)(Sidebar)

export default SidebarContainer;
