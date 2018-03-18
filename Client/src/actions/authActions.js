import axios from 'axios'
import {
  CONFIG_ULR
} from '../config'
import {
  USER_GET,
  USER_RESET
} from './userActions';

export function AUTHENTICATE_LOCAL(data) {
  return (dispatch) => {
    dispatch(AUTHENTICATE_PENDING());
    axios.post(`${CONFIG_ULR}/auth/local`, data).then(response => {
      let authenticationToken = response.data.data;
      if (!localStorage.getItem('AuthenticationToken'))
        localStorage.setItem('AuthenticationToken', authenticationToken);
      dispatch(AUTHENTICATE_SUCCESS(authenticationToken));
      dispatch(USER_GET(authenticationToken));
    }).catch(error => {
      dispatch(AUTHENTICATE_ERROR(error.message));
    });
  }
}

export function AUTHENTICATE_FACEBOOK(facebookToken) {
  return (dispatch) => {
    dispatch(AUTHENTICATE_PENDING());
    axios.get(`${CONFIG_ULR}/auth/facebook/token?access_token=${facebookToken}`).then(response => {
      let authenticationToken = response.data.data;
      if (!localStorage.getItem('AuthenticationToken'))
        localStorage.setItem('AuthenticationToken', authenticationToken);
      dispatch(AUTHENTICATE_SUCCESS(authenticationToken));
      dispatch(USER_GET(authenticationToken));
    }).catch(error => {
      dispatch(AUTHENTICATE_ERROR(error.message));
    });
  }
}

export function AUTHENTICATE_SUCCESS(response) {
  return {
    type: 'AUTHENTICATE_SUCCESS',
    payload: response
  }
}

export function AUTHENTICATE_ERROR(error) {
  return {
    type: 'AUTHENTICATE_ERROR',
    payload: error
  }
}

export function AUTHENTICATE_PENDING() {
  return {
    type: 'AUTHENTICATE_PENDING'
  }
}

export function AUTHENTICATE_LOGOUT() {
  return (dispatch) => {
    localStorage.removeItem('AuthenticationToken');
    dispatch({
      type: 'AUTHENTICATE_LOGOUT'
    });
    dispatch(USER_RESET());
  }

}
