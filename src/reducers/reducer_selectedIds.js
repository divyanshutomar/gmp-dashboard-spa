import { SELECT_COMPANY,SELECT_PARKING,SELECT_PARKINGLOT,SELECT_USER,CLEAR_SELECT } from '../actions/actionTypes'

const InitialSelectState = {
	companyId: null,
	parkingId: null,
	parkingLotId: null,
	username: null
}

export default function (state=InitialSelectState,action) {
	switch(action.type) {
		case SELECT_COMPANY:
			return(
				Object.assign({},state,{
					'companyId': action.payload.companyId
				})
				);
		case SELECT_PARKING:
			return(
				Object.assign({},state,{
					'parkingId': action.payload.parkingId
				})
				);
		case SELECT_PARKINGLOT:
			return (
				Object.assign({},state,{
					'parkingLotId' : action.payload.parkingLotId
				})
				);
		case SELECT_USER:
			return (
				Object.assign({},state,{
					'username': action.payload.username
				})
				);
		case CLEAR_SELECT:
			return (
				Object.assign({},state,{
					'companyId': null,
					'parkingId': null,
					'parkingLotId': null,
					'username': null
				})
				);					
		default: return state			
	}
}