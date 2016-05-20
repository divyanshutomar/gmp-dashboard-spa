//Node Modules Imports
import React from 'react'
import ReactDOM from 'react-dom';

//User Modules Imports
import Root from './containers/Root'
import appStore from './store'
import { loginUserSuccess } from './actions'

//Checking for Auth Token
let token = localStorage.getItem('token');
if (token !== null) {
    appStore.dispatch(loginUserSuccess(token));
}

//Main App Rendering
ReactDOM.render( <Root store={appStore} /> ,document.querySelector('.mainApp'));
