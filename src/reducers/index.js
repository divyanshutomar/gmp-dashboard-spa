//Node Module Imports
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'

//User Module Imports
import userReducer from './reducer_auth'
import userAccessReducer from './reducer_userAccess'
import userReportsReducer from './reducer_reports'
import selectedIdsReducer from './reducer_selectedIds'

export default combineReducers({
	user: userReducer,
	userAccess: userAccessReducer,
	userReports: userReportsReducer,
	selectedIds: selectedIdsReducer,
	routing: routerReducer
});
