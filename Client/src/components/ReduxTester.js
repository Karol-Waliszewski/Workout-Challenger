import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class ReduxTester extends Component {

  render() {
    return (<div>
      <button className="button is-success" onClick={this.props.increment}>INCREMENT</button>
      <br/>
      <button className="button is-danger" onClick={this.props.decrement} >DECREMENT</button>
      <p>{this.props.counter}</p>
    </div>)
  }
}

function mapStateToProps(state) {
  return {counter: state.counter};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({decrement,increment},dispatch);
}

function increment() {
  return {type: 'INCREMENT',payload: 1}
}
function decrement() {
  return {type: 'DECREMENT',payload: 1}
}
var BetterReduxTester = connect(mapStateToProps,mapDispatchToProps)(ReduxTester)

export default BetterReduxTester;
