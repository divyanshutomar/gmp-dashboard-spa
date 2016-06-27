import _ from 'lodash'

export function convertType(value){
  var values = {undefined: undefined, null: null, true: true, false: false}
     ,isNumber = !isNaN(+(value));
  return isNumber && +(value) || !(value in values) && value || values[value];
}
export function processUserAccesses(response) {
	let companyAccess = []
	let parkingAccess = []
	let parkingLotsAccess = []
	let parkingSubLotsAccess = []
	response.map((company)=>{
		let companyObj = {id:company.id,name:company.name,parkings:[],parkingLots:[],parkingSubLots:[]}
		company.parkings.map((parking)=>{
			let parkingObj = {id:parking.id,name:parking.name,parkingLots: [],parkingSubLots: []}
			parking.parkingLots.map((parkingLot)=>{
				let parkingLotObj = {id:parkingLot.id,name:parkingLot.name,parkingSubLots: []}
				parkingLot.parkingSubLots.map((parkingSubLot)=>{
					companyObj.parkingSubLots.push({id:parkingSubLot.id,type:parkingSubLot.type})
					parkingObj.parkingSubLots.push({id:parkingSubLot.id,type:parkingSubLot.type})
					parkingLotObj.parkingSubLots.push({id:parkingSubLot.id,type:parkingSubLot.type})
					parkingSubLotsAccess.push({id:parkingSubLot.id,type:parkingSubLot.type})
				})
				companyObj.parkingLots.push({id:parkingLot.id,name:parkingLot.name})
				parkingObj.parkingLots.push({id:parkingLot.id,name:parkingLot.name})
				parkingLotsAccess.push(parkingLotObj)
			})
			companyObj.parkings.push({id:parking.id,name:parking.name})
			parkingAccess.push(parkingObj)
		})
		companyAccess.push(companyObj)
	})
	return { companyAccess,parkingAccess,parkingLotsAccess,parkingSubLotsAccess }
}

export function checkCompanyAccessLevel(userAccesses){
	let checkParking = _.filter(userAccesses,_.iteratee({'accessTitle': 'REPORT_PARKING'}));
	let checkCompany = _.filter(userAccesses,_.iteratee({'accessTitle': 'REPORT_COMPANY'}));
	return checkCompany.length > 0 && checkParking.length == 0 ? true : false	
}
export function checkReportAccessLevel(userAccess) {
	let checkParking = _.filter(userAccesses,_.iteratee({'accessTitle': 'REPORT_PARKING'}));
	let checkCompany = _.filter(userAccesses,_.iteratee({'accessTitle': 'REPORT_COMPANY'}));
	return checkCompany.length == 0 && checkParking.length == 0 ? true : false
}

//Report Processing Functions
export function getCompanyName(Cid,comp) {
	let resultC =  _.find(comp,(company)=> { return company.id == Cid})
	return resultC.name
}
export function getParkingName(Pid,park) {
	let resultP =  _.find(park,(parking)=> { return parking.id == Pid})
	return resultP.name
}
export function getParkingLName(PLid,parkL) {
	let resultPL =  _.find(parkL,(parkingL)=> { return parkingL.id == PLid})
	return resultPL.name
}
export function getParkingSLName(PSLid,parkSL) {
	let resultPSL =  _.find(parkSL,(parkingSL)=> { return parkingSL.id == PSLid})
	return resultPSL.type
}
export function generateUsers(reports){
	let usernames = [];
	reports.map(function (report) {
		usernames.push(report.username)
	})
	return usernames;
}
export function insertNames(reports,userAccess) {
	reports.map((report)=>{
		// report.companyName = getCompanyName(report.companyId,userAccess.companyAccess)
		// report.parkingName = getParkingName(report.parkingId,userAccess.parkingAccess)
		// report.parkingLotName = getParkingLName(report.parkingLotId,userAccess.parkingLotsAccess)
		report.parkingReports.map((SublotStats)=>{
			SublotStats.parkingSubLotName = getParkingSLName(SublotStats.parkingSubLotId,userAccess.parkingSubLotsAccess)
		})
	})
	return reports
}

export function processUserSumReports(reports,parkingSLAccess) {
	let processedReports = []
	let SublotStatsArray = []
	let parkingSLArray = []
	parkingSLAccess.map((sublot)=>{parkingSLArray.push(sublot.type)})
	parkingSLArray = _.uniq(parkingSLArray)
	reports.map((userReport)=> {
		userReport.parkingReports.map((SublotStats)=>{
			SublotStatsArray.push(SublotStats)
		})
	})
	parkingSLArray.map((sublot)=>{
		let sublotObj = {
			checkInCount: 0,
			checkOutCount: 0,
			focCount: 0,
			ttCount: 0,
			checkInRevenue: 0,
			checkOutRevenue: 0,
			passCheckInCount: 0,
			passCheckOutCount: 0,
			acCount: 0,
			parkingSubLotName: sublot
		}
		SublotStatsArray.map((SublotStats)=>{
			if (sublot === SublotStats.parkingSubLotName) {
				sublotObj.checkInCount += SublotStats.checkInCount
				sublotObj.checkOutCount += SublotStats.checkOutCount
				sublotObj.focCount += SublotStats.focCount
				sublotObj.ttCount += SublotStats.ttCount
				sublotObj.checkInRevenue += SublotStats.checkInRevenue
				sublotObj.checkOutRevenue += SublotStats.checkOutRevenue
				sublotObj.passCheckInCount += SublotStats.passCheckInCount
				sublotObj.passCheckOutCount += SublotStats.passCheckOutCount
				sublotObj.acCount += SublotStats.acCount
			}
		})
		processedReports.push(sublotObj)
	})
	
	let filteredReports = _.filter(SublotStatsArray,function(SubLot) {
		return (parkingSLArray.indexOf(SubLot.parkingSubLotName) === -1)
	})
	return (_.concat(processedReports,filteredReports))
}