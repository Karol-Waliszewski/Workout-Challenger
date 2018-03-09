import axios from 'axios'
import {
  CONFIG_ULR
} from '../config'

export function AUTHENTICATE_LOCAL(data) {
  return (dispatch) => {
    dispatch(AUTHENTICATE_PENDING());
    axios.post(`${CONFIG_ULR}/auth/local`, data).then(response => {
      if (!localStorage.getItem('AuthenticationToken'))
        localStorage.setItem('AuthenticationToken', response.data.data);
      dispatch(AUTHENTICATE_SUCCESS(response.data.data));
    }).catch(error => {
      dispatch(AUTHENTICATE_ERROR(error.message));
    });
  }
}

export function AUTHENTICATE_FACEBOOK(facebookToken) {
  return (dispatch) => {
    dispatch(AUTHENTICATE_PENDING());
    axios.get(`${CONFIG_ULR}/auth/facebook/token?access_token=${facebookToken}`).then(response => {
      dispatch(AUTHENTICATE_SUCCESS(response.data));
    }).catch(error => {
      dispatch(AUTHENTICATE_ERROR(error));
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
        localStorage.removeItem('AuthenticationToken');
  return {
    type: 'AUTHENTICATE_LOGOUT'
  }
}
