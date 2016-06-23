//Node Modules Imports
import React from 'react'
import ReactDOM from 'react-dom';

//User Modules Imports
import Root from './components/Root'
import appStore from './store'
import { loginUserSuccess } from './actions'

//Checking for Auth Token
// let token = localStorage.getItem('gmpB2bToken');
// let B2bUser = localStorage.getItem('gmpB2bUser');
// let B2bUserAccess = localStorage.getItem('gmpB2bUserAccess');
// if (token !== null && B2bUser !==null && B2bUserAccess !==null) {
//     appStore.dispatch(loginUserSuccess(token,B2bUser,JSON.parse(B2bUserAccess)));
// }

//Main App Rendering
ReactDOM.render( <Root store={appStore} /> ,document.querySelector('.mainApp'));
