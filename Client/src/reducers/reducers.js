import {
  combineReducers
} from 'redux' 
import sidebarReducer from './sidebarReducer'
import authReducer from './authReducer'
import routerReducer from './routerReducer'
import userReducer from './userReducer'
import exercisesReducer from './exercisesReducer'

var reducers = combineReducers({
  sidebar: sidebarReducer,
  auth: authReducer,
  router: routerReducer,
  user: userReducer,
  exercises: exercisesReducer,
});

export default reducers;
