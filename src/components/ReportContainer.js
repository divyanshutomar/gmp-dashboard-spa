import React from 'react'
import {connect} from 'react-redux';

import {ReportTable} from './ReportTable'
import SelectorBox from './SelectorBox'
import rangeReportsSelector from '../selectors/selector_rangeReports'
import { processUserRangeReports,generateUserSumReport } from '../utils'

class ReportContainer extends React.Component {
	constructor(props){
		super(props);
		this.generateReports = this.generateReports.bind(this)	
	}
	generateReports(){
		let processedReports = []
		let companyDetails = this.props.userAccess.companyAccess;
		let parkingDetails = this.props.userAccess.parkingAccess;
		let parkingLotDetails = this.props.userAccess.parkingLotsAccess;
		let parkingSubLotDetails = this.props.userAccess.parkingSubLotsAccess;
		this.props.selectedRangeReports.map(function (report) {
			let sublotReports = 
			processUserRangeReports(companyDetails,parkingDetails,parkingLotDetails,parkingSubLotDetails,report)
			processedReports.push(sublotReports)
		});
		let groupedReports = _.groupBy(_.flatten(processedReports),'pslid');
		let userSumReports = generateUserSumReport(groupedReports)
		
	}
	componentDidMount(){

	}
	render(){
		return(
			<div>				
				<SelectorBox/>
				<div>
				</div>
			</div>
			);
	}
}

function mapStateToProps(state) {
	return {
	selectedRangeReports: rangeReportsSelector(state),
	userAccess: state.userAccess
	}
}
export default connect(mapStateToProps)(ReportContainer);

