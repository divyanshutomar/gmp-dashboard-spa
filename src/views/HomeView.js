import React from 'react';
import {Link} from 'react-router';
import {getUserAccess} from '../actions';
import {connect} from 'react-redux';
import DateSelector from '../components/DateSelector'
import ReportContainer from  '../components/ReportContainer'

class HomeView extends React.Component {
    constructor(props) {
        super(props);
    }
	
    render () {
        return (
            <div>            	
                <h4>Report Summary</h4>
                <DateSelector/>
                {
                    this.props.isRangeReport ?
                    <ReportContainer/> :
                    <h5>No reports available for display.Fetch the reports first !</h5>
                }
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        isRangeReport: state.userReports.isRangeReport
    }
}
export default connect(mapStateToProps,{getUserAccess})(HomeView);

