//Node Modules Imports
import React from 'react'
import ReactDOM from 'react-dom';

//User Modules Imports
import Root from './containers/Root'
import appStore from './store'
import { loginUserSuccess } from './actions'

//Checking for Auth Token
let token = localStorage.getItem('gmpB2bToken');
let B2bUser = localStorage.getItem('gmpB2bUser');
if (token !== null && B2bUser !==null) {
    appStore.dispatch(loginUserSuccess(token,B2bUser));
}

//Main App Rendering
ReactDOM.render( <Root store={appStore} /> ,document.querySelector('.mainApp'));
