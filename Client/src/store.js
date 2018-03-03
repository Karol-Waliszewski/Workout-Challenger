import {
  createStore,
  applyMiddleware
} from 'redux'
import logger from 'redux-logger'
import reducers from './reducers/reducers'

const middlewares = applyMiddleware(logger);

let store = createStore(reducers, middlewares);

export default store
