import React, {Component} from 'react';
import {Route} from "react-router-dom";

// Components
import Layout from './components/Layout'
import SecuredRoute from './components/SecuredRoute'
import UnauthRoute from './components/UnauthenticatedRoute'

import Login from './pages/login'
import Register from './pages/register'
import Index from './pages/index'
import NotFound from './pages/404'

var Secured = () => (<h1 className="title">This is secured Route hah</h1>)

class App extends Component {
  render() {
    return (
      <Layout>
        <Route path="/" exact component={Index}></Route>
        <UnauthRoute path="/login" exact component={Login}></UnauthRoute>
        <UnauthRoute path="/register" exact component={Register}></UnauthRoute>
        <SecuredRoute path="/secured" exact component={Secured}></SecuredRoute>
        <Route path="*" component={NotFound} />
    </Layout>);
  }
}

export default App;
