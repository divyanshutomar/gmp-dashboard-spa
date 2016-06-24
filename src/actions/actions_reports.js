
//User Module Imports
import Path from '../api.js'
import { GET_USER_REPORTS,SELECT_COMPANY,SELECT_PARKING,SELECT_PARKINGLOT,SELECT_USER,CLEAR_SELECT,CLEAR_USER_REPORTS } from './actionTypes'
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
export function clearSelect() {
    return ({
        type: CLEAR_SELECT
    })
}
export function clearUserReports() {
    return ({
        type: CLEAR_USER_REPORTS
    })
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
                let users =  userWise?generateUsers(response):[]
                let selectedUser = getState().selectedIds.username
                if(userWise){
                    if (selectedUser == null) {
                        dispatch(selectUser(users[0]))
                    }                  
                } else {
                    dispatch(selectUser(null))
                }                
            	dispatch(rangeReportSucces(response,userWise,users));
            })
            .catch(error => {
                Materialize.toast(error.message, 2000);
            })
  }
}
