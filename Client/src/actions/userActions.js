import axios from 'axios'
import {
  CONFIG_ULR
} from '../config'

export function USER_GET(token) {
  return (dispatch) => {
    dispatch(USER_PENDING());
    axios.get(`${CONFIG_ULR}/user/get/${token}`).then(response => {
      dispatch(USER_SUCCESS(response.data.data));
    }).catch(error => {
      dispatch(USER_ERROR(error.message));
    });
  }
}

export function USER_SUCCESS(response) {
  return {
    type: 'USER_SUCCESS',
    payload: response
  }
}

export function USER_ERROR(error) {
  return {
    type: 'USER_ERROR',
    payload: error
  }
}

export function USER_PENDING() {
  return {
    type: 'USER_PENDING'
  }
}

export function USER_RESET() {
  return {
    type: 'USER_RESET'
  }
}
