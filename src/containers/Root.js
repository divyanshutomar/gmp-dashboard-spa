//Node Module Imports
import React from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

//User Module Imports
import routes from '../routes';
import appStore from '../store'

//History Config
const history = syncHistoryWithStore(browserHistory,appStore)

export default class Root extends React.Component {

    render () {
        return (
            <div>
                <Provider store={this.props.store}>
                        <Router history={history}>
                            {routes}
                        </Router>   
                </Provider>
            </div>
        );
    }
}
Root.propTypes = {
    store: React.PropTypes.object.isRequired
};
