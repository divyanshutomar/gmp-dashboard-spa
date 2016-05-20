//Node Module Imports
import { createStore, applyMiddleware, compose } from 'redux'
import ReduxThunk from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'
import { browserHistory } from 'react-router'

//User Defined Imports
import reducers from '../reducers'


//Middlewares
const routerMiddle = routerMiddleware(browserHistory)
const middleware = [
			ReduxThunk,
			routerMiddle	
			]

//Store Configuration
export default createStore(
	reducers,
	compose(
		applyMiddleware(...middleware),
		window.devToolsExtension ? window.devToolsExtension() : undefined
	)
);
