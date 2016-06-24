import React from 'react'
import {connect} from 'react-redux';

import ReportTable from './ReportTable'
import SelectorBox from './SelectorBox'
import rangeReportsSelector from '../selectors/selector_rangeReports'
import { processUserRangeReports,generateUserSumReport,insertNames } from '../utils'

class ReportContainer extends React.Component {
	constructor(props){
		super(props);

	}
	// generateReports(){
	// 	let processedReports = []
	// 	let companyDetails = this.props.userAccess.companyAccess;
	// 	let parkingDetails = this.props.userAccess.parkingAccess;
	// 	let parkingLotDetails = this.props.userAccess.parkingLotsAccess;
	// 	let parkingSubLotDetails = this.props.userAccess.parkingSubLotsAccess;
	// 	this.props.selectedRangeReports.map(function (report) {
	// 		let sublotReports = 
	// 		processUserRangeReports(companyDetails,parkingDetails,parkingLotDetails,parkingSubLotDetails,report)
	// 		processedReports.push(sublotReports)
	// 	});
	// 	let groupedReports = _.groupBy(_.flatten(processedReports),'pslid');
	// 	let userSumReports = generateUserSumReport(groupedReports)
		
	// }
	componentWillMount(){
		insertNames(this.props.selectedRangeReports,this.props.userAccess)
	}
	componentWillReceiveProps(nextProps) {
		insertNames(nextProps.selectedRangeReports,this.props.userAccess)
  	}
	componentDidMount(){

	}
	render(){
		return(
			<div>				
				<SelectorBox/>
				<div>
					{
						this.props.selectedRangeReports.length>0 ?
						this.props.selectedRangeReports.map(function (report) {
							return (<ReportTable key={report.parkingLotId+report.parkingReports[0].parkingSubLotName} report={report}/>)
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
	userAccess: state.userAccess
	}
}
export default connect(mapStateToProps)(ReportContainer);
