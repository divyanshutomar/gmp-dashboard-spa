import _ from 'lodash'

export function convertType(value){
  var values = {undefined: undefined, null: null, true: true, false: false}
     ,isNumber = !isNaN(+(value));
  return isNumber && +(value) || !(value in values) && value || values[value];
}

// export function processUserAccesses (response) {
// 	let companyAccess = []
// 	let parkingAccess = []
// 	let parkingLotsAccess = []
// 	let parkingSubLotsAccess = []
// 	if (response.length>0) {
// 		for (let company of response) {
// 		let C_parkings = []
// 		let C_parkingLots = []
// 		let C_parkingSubLots = []	
// 		companyAccess.push({id:company.id,name:company.name,parkings:C_parkings,parkingLots:C_parkingLots,parkingSubLots:C_parkingSubLots})
// 		let parkingsList = company.parkings
// 		if (parkingsList.length>0){
// 		  for (let parking of parkingsList) {
// 		  	let P_parkingLots = []
// 		  	let P_parkingSubLots = []						
// 		  	parkingAccess.push({id:parking.id,name:parking.name,parkingLots:P_parkingLots,parkingSubLots:P_parkingSubLots})
// 		  	C_parkings.push({id:parking.id,name:parking.name})
// 		  	let parkingLotsList = parking.parkingLots
// 		  	if (parkingLotsList.length>0) {
// 		  		for (let parkingLot of parkingLotsList) {
// 		  			let PL_parkingSubLots = []			
// 		  			parkingLotsAccess.push({id:parkingLot.id,name:parkingLot.name,parkingSubLots: PL_parkingSubLots})
// 		  			C_parkingLots.push({id:parkingLot.id,name:parkingLot.name})
// 		  			P_parkingLots.push({id:parkingLot.id,name:parkingLot.name})
// 		  			let parkingSubLotsList = parkingLot.parkingSubLots
// 		  			if (parkingSubLotsList.length>0) {
// 		  				for (let parkingSubLot of parkingSubLotsList){			
// 		  					parkingSubLotsAccess.push({id:parkingSubLot.id,type:parkingSubLot.type})
// 		  					C_parkingSubLots.push({id:parkingSubLot.id,type:parkingSubLot.type})
// 		  					P_parkingSubLots.push({id:parkingSubLot.id,type:parkingSubLot.type})
// 		  					PL_parkingSubLots.push({id:parkingSubLot.id,type:parkingSubLot.type})
// 		  				}
// 		  			}
// 		  		}
// 		  	}
// 		  }
// 		}  
// 		}
// 	}
// 	console.log({companyAccess,parkingAccess,parkingLotsAccess,parkingSubLotsAccess})
// 	return { companyAccess,parkingAccess,parkingLotsAccess,parkingSubLotsAccess };
// }
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
	return checkCompany.length>0 && checkParking.length == 0 ? true : false	
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
export function processUserRangeReports(comp,park,parkL,parkSL,report) {
	let tableValues = []
	let compName = getCompanyName(report.companyId,comp);
	let parkName = getParkingName(report.parkingId,park);
	let parkLName = getParkingLName(report.parkingLotId,parkL);
	report.parkingReports.map(function (sublot) {
		let tableVal = {companyName:compName,parkingName:parkName,parkingLotName:parkLName}
		tableVal.parkingSubLotName = getParkingSLName(sublot.parkingSubLotId,parkSL);
		tableVal.inC = sublot.checkInCount
		tableVal.outC = sublot.checkOutCount
		tableVal.focC = sublot.focCount
		tableVal.ttC = sublot.ttCount
		tableVal.total = sublot.checkInCount+sublot.checkOutCount+sublot.focCount+sublot.ttCount
		tableVal.cid = report.companyId
		tableVal.pid = report.parkingId
		tableVal.plid = report.parkingLotId
		tableVal.pslid = sublot.parkingSubLotId
		tableValues.push(tableVal)
	})
	return tableValues
}

export function generateUserSumReport(groupedVal) {
	let TableValues = []
	_.forOwn(groupedVal, function(value,key) {
		let tableVal = {companyName:value[0].companyName,parkingName:value[0].parkingName,parkingLotName:value[0].parkingLotName,parkingSubLotName:value[0].parkingSubLotName}
  		tableVal.inC = 0
		tableVal.outC = 0
		tableVal.focC = 0
		tableVal.ttC = 0
		tableVal.total = 0 
  		for (let report of value)
  		{
  			tableVal.inC += report.inC
  			tableVal.outC += report.outC
  			tableVal.focC += report.focC
  			tableVal.ttC += report.ttC
  			tableVal.total += report.total
  		}
  		TableValues.push(tableVal)
	});
	return TableValues;
}