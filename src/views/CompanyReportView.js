import React from 'react';
import {Link} from 'react-router';
import {getUserAccess} from '../actions';
import {connect} from 'react-redux';
import DateSelector from '../components/DateSelector'
import ReportContainer from  '../components/ReportContainer'
import { checkReportAccessLevel } from '../utils'

class CompanyReportView extends React.Component {
    constructor(props) {
        super(props);
    }
	
    render () {
        return (
            <div>            	
                <h4>Report Summary</h4>
                <DateSelector/>
                {   
                    // checkReportAccessLevel(this.props.userAccesses) ?
                        this.props.isRangeReport ?
                        <ReportContainer/> :
                        <h5>No reports available for display.Fetch the reports first !</h5>
                    // :
                    // <h5>You do not have access to Reports.</h5>    
                }
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        isRangeReport: state.userReports.isRangeReport,
        // userAccesses : state.user.userAccess.userAccesses
    }
}
export default connect(mapStateToProps,{getUserAccess})(CompanyReportView);

