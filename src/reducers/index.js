import { combineReducers } from 'redux';
import CompaniesReducer from './reducer_companies.js'

const rootReducer = combineReducers({
  companies: CompaniesReducer
});

export default rootReducer;
