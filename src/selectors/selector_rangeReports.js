import { createSelector } from 'reselect'
import _ from 'lodash'
import { convertType } from '../utils'
import { insertNames } from '../utils'

const rangeReportsSelector = state => state.userReports.rangeReport
const selectedIdsSelector = state => state.selectedIds
const userAccessSelector = state => state.userAccess

const getSelectedReports = (rangeReports,selectedIds,userAccess) => {
	let filterObject = {
		companyId: convertType(selectedIds.companyId),
		parkingId: convertType(selectedIds.parkingId),
		parkingLotId: convertType(selectedIds.parkingLotId),
		username: selectedIds.username
	}
	let trueFilteredObj = _.omitBy(filterObject, _.isNil)
	let filteredReports = _.filter(rangeReports,_.iteratee(trueFilteredObj))
	let filteredReportsWithName = insertNames(filteredReports,userAccess)
    return (filteredReportsWithName);	
}

export default createSelector(
	rangeReportsSelector,
	selectedIdsSelector,
	userAccessSelector,
	getSelectedReports
);