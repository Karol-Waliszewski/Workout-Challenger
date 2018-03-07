import {
  combineReducers
} from 'redux' 
import sidebarReducer from './sidebarReducer'
import authReducer from './authReducer'

function counter(state = 0, action) {
  if (!action.payload)
    action.payload = 1;
  switch (action.type) {
    case 'INCREMENT':
      return state + action.payload;
      break;
    case 'DECREMENT':
      return state - action.payload;
      break;
    default:
      return state;
  }
}

var reducers = combineReducers({
  counter,
  sidebar: sidebarReducer,
  auth: authReducer
});
export default reducers;
