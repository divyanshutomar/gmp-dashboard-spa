
//User Module Imports
import Path from '../api.js'
import { GET_USER_REPORTS,SELECT_COMPANY,SELECT_PARKING,SELECT_PARKINGLOT,SELECT_USER } from './actionTypes'
import { generateUsers } from '../utils'

export function rangeReportSucces(response,userWise,users) {
    return({
        type: GET_USER_REPORTS,
        payload: {
            rangeReport: response,
            isUserWise: userWise,
            usernames: users
        }
    });
}
export function selectCompany(companyId) {
    return ({
        type: SELECT_COMPANY,
        payload: {
            companyId
        }
    });
}

export function selectParking(parkingId) {
    return ({
        type: SELECT_PARKING,
        payload: {
            parkingId
        }
    });
}
export function selectParkingLot(parkingLotId) {
    return ({
        type: SELECT_PARKINGLOT,
        payload: {
            parkingLotId
        }
    });
}
export function selectUser(username) {
    return({
        type: SELECT_USER,
        payload: {
            username
        }
    });
}


export function getUserReport (startDate,endDate,userWise) {
    console.log(startDate)
    console.log(endDate)
  return (dispatch,getState) => {
    let companyId = getState().userAccess.companyAccess[0].id
    return fetch(`${Path.API_end}Companies/${companyId}/userReport/details?from=${startDate}&to=${endDate}`,{
                method: 'GET', 
                headers: {"Authorization": getState().user.token}          
                }
            )
            .then(response => response.ok ? response.json() : response.json().then(errorResponse => Promise.reject(errorResponse.error)))            
            .then(response => {
                console.log(response)
                let users =  userWise?generateUsers(response):[]                
            	dispatch(rangeReportSucces(response,userWise,users));
            })
            .catch(error => {
                Materialize.toast(error.message, 2000);
            })
  }
}
