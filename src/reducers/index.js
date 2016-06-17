//Node Module Imports
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'

//User Module Imports
import companiesReducer from './reducer_companies'
import userReducer from './reducer_auth'
import userAccessReducer from './reducer_userAccess'

export default combineReducers({
	user: userReducer,
	userAccess: userAccessReducer,
	companies: companiesReducer,
	routing: routerReducer
});
