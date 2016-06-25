import React from 'react'
import {connect} from 'react-redux';
import _ from 'lodash'
import ReportTable from './ReportTable'
import SelectorBox from './SelectorBox'
import rangeReportsSelector from '../selectors/selector_rangeReports'
import { processUserSumReports } from '../utils'
import { AllReportTable } from './AllReportTable'

class ReportContainer extends React.Component {
	constructor(props){
		super(props);

	}
	render(){
		return(
			<div>				
				<SelectorBox/>
				<div>
					{
						this.props.selectedRangeReports.length>0 ?
							this.props.isUserWise ?
							this.props.selectedRangeReports.map(function (report) {
								return (<ReportTable key={report.parkingLotId+report.parkingReports[0].parkingSubLotName} report={report}/>)
							})
							:
							processUserSumReports(this.props.selectedRangeReports,this.props.userAccess.parkingSubLotsAccess).map((report)=>{
								return (<AllReportTable key={report.parkingSubLotName+_.random(0, 200)} report={report}/>)
							})
						:
						<h5>No Reports Found</h5>
					}
				</div>
			</div>
			);
	}
}

function mapStateToProps(state) {
	return {
	selectedRangeReports: rangeReportsSelector(state),
	userAccess: state.userAccess,
	isUserWise: state.userReports.isUserWise
	}
}
export default connect(mapStateToProps)(ReportContainer);
