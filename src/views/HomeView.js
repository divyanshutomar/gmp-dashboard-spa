import React from 'react';
import {Link} from 'react-router';
import ChartistGraph from 'react-chartist';
import {getUserAccess} from '../actions';
import {connect} from 'react-redux';

class HomeView extends React.Component {

    componentWillMount() {
        this.props.getUserAccess();
    }
	
    render () {
        return (
            <div>            	
                <h1>Welcome to Admin Dashboard</h1>
            </div>
        );
    }
}
export default connect(null,{getUserAccess})(HomeView);

