//Node Modules Imports
import axios from 'axios'


//Fetch Actions
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

export * from './actions_auth'