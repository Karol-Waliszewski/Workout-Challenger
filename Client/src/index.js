import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import Store from './store'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import {AUTHENTICATE_SUCCESS} from './actions/authActions'

// Styles
import './stylesheets/App.css'
import 'bulma/css/bulma.css'

if(localStorage.getItem('AuthenticationToken')){
  let token = localStorage.getItem('AuthenticationToken');
  Store.dispatch(AUTHENTICATE_SUCCESS(token));
}

ReactDOM.render(<Provider store={Store}><App/></Provider>, document.getElementById('root'));
registerServiceWorker();
