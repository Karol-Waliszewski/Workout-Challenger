import {
  combineReducers
} from 'redux' 
import sidebarReducer from './sidebarReducer'
import authReducer from './authReducer'
import routerReducer from './routerReducer'
import userReducer from './userReducer'


var reducers = combineReducers({
  sidebar: sidebarReducer,
  auth: authReducer,
  router: routerReducer,
  user: userReducer
});

export default reducers;
