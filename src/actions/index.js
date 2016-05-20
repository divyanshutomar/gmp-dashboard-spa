//Node Modules Imports
import axios from 'axios'
import { push } from 'react-router-redux'

//User Module Imports
import Path from '../api.js'
import {LOGIN_USER_REQUEST, LOGIN_USER_FAILURE, LOGIN_USER_SUCCESS, LOGOUT_USER, FETCH_COMPANIES} from './actionTypes';
import { checkHttpStatus,parseJSON } from '../utils'

//Action Creators

//Auth Actions
export function loginUserSuccess(token,username) {
  localStorage.setItem('token', token);
  return {
    type: LOGIN_USER_SUCCESS,
    payload: {
      token: token,
      username: username
    }
  }
}

export function loginUserFailure(error) {
  localStorage.removeItem('token');
  return {
    type: LOGIN_USER_FAILURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText
    }
  }
}

export function loginUserRequest() {
  return {
    type: LOGIN_USER_REQUEST
  }
}

export function logout() {
    localStorage.removeItem('token');
    return {
        type: LOGOUT_USER
    }
}

export function logoutAndRedirect() {
    return (dispatch,getState) => {
        dispatch(logout());
        Materialize.toast(getState().user.statusText, 2000);
        dispatch(push('/login'));
    }
}

export function loginUser(username, password, redirect="/") {

    return function(dispatch,getState) {
        dispatch(loginUserRequest());
        return fetch(`${Path.API_end}UserB2bs/xyz`,{
                  method:'POST',
                  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                  body:`username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`              
                }
            )
            .then(checkHttpStatus)
            .then(parseJSON)
            .then(response => {
                try {
                    dispatch(loginUserSuccess(response.authToken,response.username));
                    Materialize.toast(getState().user.statusText, 2000);
                    dispatch(push(redirect));
                } catch (e) {
                    dispatch(loginUserFailure({
                        response: {                                
                                status: 403,
                                statusText: 'Invalid token'                           
                        }
                    }));
                    Materialize.toast(getState().user.statusText, 2000);
                }
            })
            .catch(error => {
                dispatch(loginUserFailure(error));
                Materialize.toast(getState().user.statusText, 2000);
            })
    }
}


//Fetch Actions
export function fetchCompanies(){
	let url = Path.API_end + "Companies";
	let request = axios.get(url,{
		headers: {
		"Authorization": Path.Authorization
		}
	});
	return({
		type: FETCH_COMPANIES,
		payload: request
	});
}