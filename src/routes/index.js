//Node Module Imports
import React from 'react';
import {Route, IndexRoute} from 'react-router';


//User Module Imports
import App from '../containers/App';
import HomeView from '../views/HomeView'
import LoginView from '../views/LoginView'
import {requireAuthentication} from '../components/AuthenticatedComponent';

export default (
    <Route path='/' component={App}>
        <IndexRoute component={requireAuthentication(HomeView)}/>
        <Route path="login" component={LoginView}/>
    </Route>
);

     //    <Route path="protected" component={requireAuthentication(ProtectedView)}/>
