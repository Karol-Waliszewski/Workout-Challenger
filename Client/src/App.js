import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Route, Switch} from "react-router-dom";

// Components
import Layout from './components/Layout'
import Tester from './components/ReduxTester'

import Login from './pages/login'
import Index from './pages/index'

class App extends Component {

  render() {
    return (<Layout>
      <Switch>
        <Route path="/" exact component={Index}></Route>
        <Route path="/login" exact component={Login}></Route>
        <Route path="/tester" exact component={Tester}></Route>
      </Switch>
    </Layout>);
  }
}

export default App;
