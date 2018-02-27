import React, {Component} from 'react';
import logo from './images/logo.svg';
import './stylesheets/App.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class App extends Component {
  constructor() {
    super();
    this.state = {
      visible: true
    };
  }

  toggleP() {
    console.log('halo')
    this.setState({
      visible: !this.state.visible
    });
  }

  render() {
    return (<div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <h1 className="App-title">Welcome to React</h1>
      </header>

      <ReactCSSTransitionGroup transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
        {
          this.state.visible &&
            <p className="App-intro">
              React test for Workout Partner
            </p>
        }
      </ReactCSSTransitionGroup>
      <button className="button is-primary" onClick={this.toggleP.bind(this)} style={{marginTop: '0.5rem'}}>Toggle text</button>
    </div>);
  }
}

export default App;
