import { push } from 'react-router-redux'

//User Module Imports
import Path from '../api.js'
import { LOGIN_USER_REQUEST, LOGIN_USER_FAILURE, LOGIN_USER_SUCCESS, LOGOUT_USER } from './actionTypes';

//Action Creators

//Auth Actions
export function loginUserSuccess(token,username,userAccess) {
  localStorage.setItem('gmpB2bToken', token);
  localStorage.setItem('gmpB2bUser', username);
  localStorage.setItem('gmpB2bUserAccess',userAccess);
  return {
    type: LOGIN_USER_SUCCESS,
    payload: {
      token: token,
      username: username,
      userAccess: userAccess
    }
  }
}

export function loginUserFailure(error) {
  localStorage.removeItem('gmpB2bToken');
  localStorage.removeItem('gmpB2bUser');
  localStorage.removeItem('gmpB2bUserAccess');
  return {
    type: LOGIN_USER_FAILURE,
    payload: {
      status: error.status,
      statusText: error.message
    }
  }
}

export function loginUserRequest() {
  return {
    type: LOGIN_USER_REQUEST
  }
}

export function logout() {
    localStorage.removeItem('gmpB2bToken');
    localStorage.removeItem('gmpB2bUser');
    localStorage.removeItem('gmpB2bUserAccess');
    return {
        type: LOGOUT_USER
    }
}

export function logoutAndRedirect() {
    return (dispatch,getState) => {
        return fetch(`${Path.API_end}UserB2bs/logout`,{
                  method:'POST',
                  headers: {'Authorization': getState().user.token}              
                }
            )
            .then(response => response.ok ? response.status : response.json().then(errorResponse => Promise.reject(errorResponse.error)))            
            .then(responseStatus => {
                    dispatch(logout());
                    Materialize.toast(getState().user.statusText, 2000);
                    dispatch(push('/login'));                  
            })
            .catch(error => {
              Materialize.toast(`${error.status} : ${error.message} `, 2000);
              dispatch(push('/login'));
            })
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
            .then(response => response.ok ? response.json() : response.json().then(errorResponse => Promise.reject(errorResponse.error)))            
            .then(response => {
                let userAccess = {
                  userAcesses: response.userAccesses,
                  companyIds : response.companyIds,
                  parkingIds : response.parkingIds,
                  parkingLotIds : response.parkingLotIds,
                  parkingSubLotIds : response.parkingSubLotIds
                }
                try {
                    dispatch(loginUserSuccess(response.authToken,response.username,userAccess));
                    Materialize.toast(getState().user.statusText, 2000);
                    dispatch(push(redirect));
                } catch (e) {
                    dispatch(loginUserFailure({                               
                                status: 403,
                                statusText: 'Invalid token'
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