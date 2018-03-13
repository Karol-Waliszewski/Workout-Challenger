import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'


class Register extends Component {

  render() {
    let {props} = this;
    return (<div className="container">
      <div className="columns is-m-0">
        <div className="column is-half-desktop is-offset-one-quarter-desktop is-m-t-2">
          <div className="section">

            <h1 className="title has-text-centered is-1">Register</h1>

            <div className="field">
              <label className="label" htmlFor="login">Login</label>
              <div className="control has-icons-left">
                <input id="login" className="input" type="text" placeholder="Enter login..."/>
                <span className="icon is-left">
                  <FontAwesomeIcon icon="user"/>
                </span>
              </div>
            </div>

            <div className="field">
              <label className="label" htmlFor="nickname">Nickname</label>
              <div className="control has-icons-left">
                <input id="nickname" className="input" type="text" placeholder="Enter nickname..."/>
                <span className="icon is-left">
                  <FontAwesomeIcon icon="user"/>
                </span>
              </div>
            </div>

            <div className="field">
              <label className="label" htmlFor="email">Email</label>
              <div className="control has-icons-left">
                <input id="email" className="input" type="email" placeholder="Enter email..."/>
                <span className="icon is-left">
                  <FontAwesomeIcon icon="at"/>
                </span>
              </div>
            </div>

            <div className="field">
              <label className="label" htmlFor="password">Password</label>
              <div className="control has-icons-left">
                <input id="password" className="input" type="password" placeholder="Enter password..."/>
                <span className="icon is-left">
                  <FontAwesomeIcon icon="lock"/>
                </span>
              </div>
            </div>

            <div className="field">
              <label className="label" htmlFor="passwordConfirm">Confirm Password</label>
              <div className="control has-icons-left">
                <input id="passwordConfirm" name="passwordConfirm" className="input" type="password" placeholder="Confirm password..."/>
                <span className="icon is-left">
                  <FontAwesomeIcon icon="lock"/>
                </span>
              </div>
            </div>

            {
              props.error && <article className="message is-small is-danger is-m-t-2">
                  <div className="message-body">
                    {props.error}
                  </div>
                </article>
            }

            <div className="field is-grouped is-grouped-right is-m-t-2">
              <div className="control">
                <button className="button is-primary" onClick={props.registerUser}>Submit</button>
              </div>
              <div className="control">
                <Link to="/" className="button is-text">Cancel</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>)
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    registerUser: (e) => {
      e.preventDefault();

      // TODO Validation

    }
  }
}

var RegisterContainer = connect(mapStateToProps, mapDispatchToProps)(Register);

export default RegisterContainer;
