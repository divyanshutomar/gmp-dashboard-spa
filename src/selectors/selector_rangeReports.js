import { createSelector } from 'reselect'
import _ from 'lodash'
import { convertType } from '../utils'

const rangeReportsSelector = state => state.userReports.rangeReport
const selectedIdsSelector = state => state.selectedIds

const getSelectedReports = (rangeReports,selectedIds) => {
	// let resultReport;
	// if (selectedIds.companyId == null && selectedIds.parkingId == null) {
	// 	return rangeReports
	// }
	// else if (selectedIds.companyId != null && selectedIds.parkingId == null) {
	// 	return _.filter(rangeReports,(report)=>{return report.companyId==selectedIds.companyId})
	// }
	// else if (selectedIds.companyId == null && selectedIds.parkingId != null) {
	// 	return _.filter(rangeReports,(report)=>{return report.parkingId==selectedIds.parkingId})
	// }
	// else {
	// 	return _.filter(rangeReports,(report)=>{return (report.companyId==selectedIds.companyId && report.parkingId==selectedIds.parkingId)})
	// }
	console.log(selectedIds)	

}

export default createSelector(
	rangeReportsSelector,
	selectedIdsSelector,
	getSelectedReports
);