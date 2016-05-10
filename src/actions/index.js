import Path from '../api.js'
import axios from 'axios'

//Action Types
export const FETCH_COMPANIES = "FETCH_COMPANIES";

//Action Creators
export function fetchCompanies(){
	let url = Path.API_end + "Companies";
	let request = axios.get(url,{
		headers: {
		"Authorization": Path.Authorization
		}
	});
	return({
		type: FETCH_COMPANIES,
		payload: request
	});
}