import React, {Component} from 'react';
import {connect} from 'react-redux';
import {AUTHENTICATE_LOCAL} from '../actions/authActions';

class Login extends Component {
  render() {
    let {props} = this;
    return (<div className="App-intro section">
      <form className="is-p-t-1">
        <div className="field">
          <label className="label">Login</label>
          <div className="control">
            <input className="input" type="text" id="login" placeholder="Enter login"/>
          </div>
        </div>

        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input className="input" type="password" id="password" placeholder="Enter password"/>
          </div>
        </div>

        <button className="button is-primary is-m-t-3" onClick={props.authenticateLocal}>
          Login
        </button>
      </form>
      {
        props.error && <article class="message is-small is-danger is-m-t-2">
            <div class="message-body">
              {props.error}
            </div>
          </article>
      }
    </div>)
  }
}
function mapStateToProps(state) {
  return {error: state.auth.error};
}

function mapDispatchToProps(dispatch) {
  return {
    authenticateLocal: (e) => {
      e.preventDefault();

      let $loginInput = document.getElementById('login');
      let $passwordInput = document.getElementById('password');

      // TODO Validation

      // Sent json have to be like: {login: 'x', password: 'y'}
      let formData = {
        login: $loginInput.value,
        password: $passwordInput.value
      }

      dispatch(AUTHENTICATE_LOCAL(formData));
    }
  }
}

var LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login)

export default LoginContainer;
