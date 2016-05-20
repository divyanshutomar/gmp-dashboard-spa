//Node Module Imports
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'

//User Module Imports
import companiesReducer from './reducer_companies'
import userReducer from './reducer_auth'

export default combineReducers({
	user: userReducer,
	companies: companiesReducer,
	routing: routerReducer
});
