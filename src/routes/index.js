//Node Module Imports
import React from 'react';
import {Route, IndexRoute} from 'react-router';


//User Module Imports
import App from '../components/App';
import CompanyReportView from '../views/CompanyReportView'
import LoginView from '../views/LoginView'
import {requireAuthentication} from '../hoc/AuthenticatedComponent';

export default (
    <Route path='/' component={App}>
        <IndexRoute component={requireAuthentication(CompanyReportView)}/>
        <Route path="login" component={LoginView}/>
    </Route>
);

     //    <Route path="protected" component={requireAuthentication(ProtectedView)}/>
