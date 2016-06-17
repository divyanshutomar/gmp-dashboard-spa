import { USER_ACCESS } from '../actions/actionTypes'

const initialAccessState = {
	companyAccess: null,
	parkingAccess: null,
	parkingLotsAccess: null,
	parkingSubLotsAccess: null
}

export default function (state = initialAccessState,action){
	switch (action.type) {
		case USER_ACCESS:
			return Object.assign({},state,{
				companyAccess : action.payload.companyAccess,
				parkingAccess : action.payload.parkingAccess,
				parkingLotsAccess : action.payload.parkingLotsAccess,
				parkingSubLotsAccess : action.payload.parkingSubLotsAccess
			});
		default: return state	
	}
}