import {
  combineReducers
} from 'redux' 
import sidebarReducer from './sidebarReducer'
import authReducer from './authReducer'
import routerReducer from './routerReducer'

var reducers = combineReducers({
  sidebar: sidebarReducer,
  auth: authReducer,
  router: routerReducer
});

export default reducers;
