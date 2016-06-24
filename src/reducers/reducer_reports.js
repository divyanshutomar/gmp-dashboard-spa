import { GET_USER_REPORTS,CLEAR_USER_REPORTS } from '../actions/actionTypes'

const InitialReportState = {
	rangeReport: null,
	isRangeReport: false,
	isUserWise: false,
	users: []
}

export default function (state = InitialReportState,action) {
	switch(action.type) {
		case GET_USER_REPORTS:
			return (
				Object.assign({},state,{
					'rangeReport': action.payload.rangeReport,
					'isRangeReport': true,
					'isUserWise': action.payload.isUserWise,
					'users': action.payload.usernames
					})
				);
		case CLEAR_USER_REPORTS:
			return (
				Object.assign({},state,{
					'rangeReport': null,
					'isRangeReport': false,
					'isUserWise': false,
					'users': []
					})
				);	
		default: return state	
	}
}