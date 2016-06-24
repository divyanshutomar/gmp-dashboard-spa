import { createSelector } from 'reselect'
import _ from 'lodash'
import { convertType } from '../utils'

const rangeReportsSelector = state => state.userReports.rangeReport
const selectedIdsSelector = state => state.selectedIds

const getSelectedReports = (rangeReports,selectedIds) => {
	let filterObject = {
		companyId: convertType(selectedIds.companyId),
		parkingId: convertType(selectedIds.parkingId),
		parkingLotId: convertType(selectedIds.parkingLotId),
		username: selectedIds.username
	}
	let trueFilteredObj = _.omitBy(filterObject, _.isNil)
    return (_.filter(rangeReports,_.iteratee(trueFilteredObj)));	
}

export default createSelector(
	rangeReportsSelector,
	selectedIdsSelector,
	getSelectedReports
);