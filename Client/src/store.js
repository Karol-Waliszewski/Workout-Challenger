import {
  createStore,
  applyMiddleware
} from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
//import promise from 'redux-promise'
import reducers from './reducers/reducers'

const middlewares = applyMiddleware(logger,thunk);

let store = createStore(reducers, middlewares);

export default store
