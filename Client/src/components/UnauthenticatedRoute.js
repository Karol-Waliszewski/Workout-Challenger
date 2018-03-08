import React from 'react';
import {Redirect, Route} from "react-router-dom";
import {connect} from 'react-redux';

class UnauthenticatedRoute extends React.Component {
  render() {
    let {props} = this;
    let routeProps = {
      path: props.path,
      exact: props.exact || false
    }
    let Component = props.component
    return (<Route {...routeProps} render={() => (
        !props.isAuthenticated
        ? (<Component/>)
        : (<Redirect to="/"/>)
      )}/>)
  }
}

function mapStateToProps(state) {
  return {isAuthenticated: state.auth.isAuthenticated};
}

var UnauthenticatedRouteContainer = connect(mapStateToProps)(UnauthenticatedRoute)

export default UnauthenticatedRouteContainer;
