import React, {Component} from 'react';
import {Redirect,Route} from "react-router-dom";


class SecuredRoute extends Component {

  render() {
    let {props} = this;
    return ({true ? (<Route {'path='+props.path} render></Route>) : ()})
  }
}

export default SecuredRoute;
