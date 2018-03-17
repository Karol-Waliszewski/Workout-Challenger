import axios from 'axios'
import {
  CONFIG_ULR
} from '../config'

export function EXERCISES_GET(token) {
  return (dispatch) => {
    dispatch(EXERCISE_PENDING());
    axios.get(`${CONFIG_ULR}/exercises/get/${token}`).then(response => {
      dispatch(EXERCISES_SUCCESS(response.data.data));
    }).catch(error => {
      dispatch(EXERCISE_ERROR(error.message));
    });
  }
}

export function EXERCISE_GET(token,id) {
  return (dispatch) => {
    dispatch(EXERCISE_PENDING());
    axios.get(`${CONFIG_ULR}/exercises/get/${token}/${id}`).then(response => {
      dispatch(EXERCISE_SUCCESS(response.data.data));
    }).catch(error => {
      dispatch(EXERCISE_ERROR(error.message));
    });
  }
}

export function EXERCISES_SUCCESS(response) {
  return {
    type: 'EXERCISES_SUCCESS',
    payload: response
  }
}

export function EXERCISE_SUCCESS(response) {
  return {
    type: 'EXERCISE_SUCCESS',
    payload: response
  }
}

export function EXERCISE_ERROR(error) {
  return {
    type: 'EXERCISE_ERROR',
    payload: error
  }
}

export function EXERCISE_FILTER(filter) {
  return {
    type: 'EXERCISE_FILTER',
    payload: filter
  }
}
export function EXERCISE_UPDATE(prop,value) {
  return {
    type: 'EXERCISE_UPDATE',
    payload: {prop,value}
  }
}
export function EXERCISE_PENDING() {
  return {
    type: 'EXERCISE_PENDING'
  }
}

export function EXERCISE_RESET() {
  return {
    type: 'EXERCISE_RESET'
  }
}
