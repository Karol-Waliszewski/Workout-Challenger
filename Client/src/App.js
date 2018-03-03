import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Route} from "react-router-dom";

// Components
import Layout from './components/Layout'
import Tester from './components/ReduxTester'
class App extends Component {
  constructor() {
    super();
    this.state = {
      visible: false
    }
  }
  toggleP() {
    console.log('halo')
    this.setState({
      visible: !this.state.visible
    });
  }

  render() {
    return (<Layout>
      <div className="App-intro">
        <ReactCSSTransitionGroup transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
          {
            this.state.visible && <p className="App-intro">
                React test for Workout Partner
              </p>
          }
        </ReactCSSTransitionGroup>
        <button className="button is-primary" onClick={this.toggleP.bind(this)} style={{
            marginTop: '0.5rem'
          }}>
          Toggle text
        </button>
        <Tester/>
      </div>
    </Layout>);
  }
}

export default App;
