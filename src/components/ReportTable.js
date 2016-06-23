import React from 'react'
import { getParkingSLName } from '../utils'

export class ReportTable extends React.Component {
	constructor(props){
		super(props);
	}
	// let cName = props.report[0].companyName
	// let pName = props.report[0].parkingName
	// let pLName = props.report[0].parkingLotName
	// {cName}>{pName}>{pLName}
	render(){
	return(
	<div className="row">
        <div className="col s12 m8 l8">
          <div className="card blue-grey darken-1">
            <div className="card-content white-text">
              <span className="card-title">Parking</span>              
		      <table className="responsive-table">
		        <thead>
		          <tr>
		              <th>Vehicle Type</th>
		              <th>In(Count)</th>
		              <th>Out(Count)</th>
		              <th>FOC(Count)</th>
		              <th>TT(Count)</th>
		              <th>Total</th>
		          </tr>
		        </thead>
		        <tbody>
		        {
			        this.props.parkingReports.map(function (report) {
			        	return(
			          	<tr>
				            <td>{getParkingSLName(report.parkingSubLotId,this.props.userAccess.parkingSubLotsAccess)}</td>
				            <td>{report.checkInCount}</td>
				            <td>{report.checkOutCount}</td>
				            <td>{report.focCount}</td>
				            <td>{report.ttCount}</td>
				            <td>asas</td>
			          	</tr>
			          	)}				          
			          )
		         } 
		        </tbody>
		       </table>   
            </div>
          </div>
        </div>
      </div>
      );
	}
}