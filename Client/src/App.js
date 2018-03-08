import React, {Component} from 'react';
import {Route, Switch} from "react-router-dom";

// Components
import Layout from './components/Layout'
import Tester from './components/ReduxTester'
import SecuredRoute from './components/SecuredRoute'
import UnauthRoute from './components/UnauthenticatedRoute'

import Login from './pages/login'
import Index from './pages/index'
import NotFound from './pages/404'

class App extends Component {

  render() {
    return (<Layout>
      <Switch>
        <Route path="/" exact={true} component={Index}></Route>
        <UnauthRoute path="/login" exact component={Login}></UnauthRoute>
        <SecuredRoute path="/tester" exact component={Tester}></SecuredRoute>
        <Route path="*" component={NotFound} />
      </Switch>
    </Layout>);
  }
}

export default App;
