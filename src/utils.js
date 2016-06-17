export function processUserAccesses (response) {
	let companyAccess = []
	let parkingAccess = []
	let parkingLotsAccess = []
	let parkingSubLotsAccess = []
	if (response.length>0) {
		for (let company of response) {	 							//Iterating over Companies
		companyAccess.push({id:company.id,name:company.name})
		let parkingsList = company.parkings
		if (parkingsList.length>0){
		  for (let parking of parkingsList) {						//Iterating over Parkings
		  	parkingAccess.push({id:parking.id,name:parking.name})
		  	let parkingLotsList = parking.parkingLots
		  	if (parkingLotsList.length>0) {
		  		for (let parkingLot of parkingLotsList) {			//Iterating over ParkingLots
		  			parkingLotsAccess.push({id:parkingLot.id,name:parkingLot.name})
		  			let parkingSubLotsList = parkingLot.parkingSubLots
		  			if (parkingSubLotsList.length>0) {
		  				for (let parkingSubLot of parkingSubLotsList){			//Iterating over ParkingSubLots
		  					parkingSubLotsAccess.push({id:parkingSubLot.id,type:parkingSubLot.type})
		  				}
		  			}
		  		}
		  	}
		  }
		}  
		}
	}

	return { companyAccess,parkingAccess,parkingLotsAccess,parkingSubLotsAccess };
}