// Scripts
import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import Store from './store'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import {AUTHENTICATE_SUCCESS} from './actions/authActions'
import {USER_GET} from './actions/userActions'

// Styles
import './stylesheets/App.css'
import 'bulma/css/bulma.css'

// Font Awesome
import fontAwesome from '@fortawesome/fontawesome'
import solidIcons from '@fortawesome/fontawesome-free-solid'
fontAwesome.library.add(solidIcons);

// Checks if someone is already logged in, then dispatches information to store.
if(localStorage.getItem('AuthenticationToken')){
  let token = localStorage.getItem('AuthenticationToken');
  Store.dispatch(AUTHENTICATE_SUCCESS(token));
  Store.dispatch(USER_GET(token));
}

ReactDOM.render(<Provider store={Store}><App/></Provider>, document.getElementById('root'));
registerServiceWorker();
