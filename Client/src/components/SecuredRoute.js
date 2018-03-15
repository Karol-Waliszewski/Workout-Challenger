import React from 'react';
import {Redirect, Route} from "react-router-dom";
import {connect} from 'react-redux';

class SecuredRoute extends React.Component {
  render() {
    let {props} = this;
    let routeProps = {
      path: props.path,
      exact: props.exact || false
    }
    let Component = props.component
    return (<Route {...routeProps} render={({match}) => {
      return(
        props.isAuthenticated
        ? (<Component params = {props.params ? match.params : null}/>)
        : (<Redirect to="/login"/>)
      )}}/>)
  }
}

function mapStateToProps(state) {
  return {isAuthenticated: state.auth.isAuthenticated};
}

var SecuredRouteContainer = connect(mapStateToProps)(SecuredRoute)

export default SecuredRouteContainer;
