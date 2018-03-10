import React, {Component} from 'react';
import {connect} from 'react-redux';
import {AUTHENTICATE_LOCAL, AUTHENTICATE_FACEBOOK} from '../actions/authActions';
import {FB_APP_ID} from '../keys'

class Login extends Component {

  componentDidMount() {
    // Facebook SDK initialization
    window.fbAsyncInit = function() {
      window.FB.init({appId: FB_APP_ID(), autoLogAppEvents: true, xfbml: true, version: 'v2.12'});
    };

    (function(d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
    // End of FB SDK
  }

  loginFacebook() {

    // Checking for login status
    window.FB.getLoginStatus((response) => {
      console.log(response)
      // If connected get accessToken then get JSON Web Token
      if (response.status === 'connected') {
        this.props.authenticateFacebook(response.authResponse.accessToken);
      } else {
        // Login to facebook
        window.FB.login((response) => {
          if (response.status === 'connected') {
            this.props.authenticateFacebook(response.authResponse.accessToken);
          } else {
            this.props.error = 'You have to log in!';
          }
        }, {scope: 'public_profile,email'});
      }
    });
  }

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

        <button className="button is-info is-m-t-3" onClick={e => {
            e.preventDefault();
            this.loginFacebook();
          }}>Facebook</button>

      </form>
      {
        props.error && <article className="message is-small is-danger is-m-t-2">
            <div className="message-body">
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
    },
    authenticateFacebook: (facebookToken) => {
      dispatch(AUTHENTICATE_FACEBOOK(facebookToken));
    }
  }
}

var LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login)

export default LoginContainer;
