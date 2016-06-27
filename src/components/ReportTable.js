import React from 'react'
import { getParkingSLName,getParkingLName } from '../utils'
import { connect } from 'react-redux'
import _ from 'lodash'

class ReportTable extends React.Component {
	constructor(props){
		super(props);
	}
	render(){
	return(
	<div className="row">
        <div className="col s12 m8 l8">
          <div className="card blue-grey darken-1">
            <div className="card-content white-text">
              <span className="card-title">{getParkingLName(this.props.report.parkingLotId,this.props.userAccess.parkingLotsAccess)}</span>              
		      <table className="responsive-table">
		        <thead>
		          <tr>
		              <th>Vehicle Type</th>
		              <th>In(Count)</th>
		              <th>Out(Count)</th>
		              <th>FOC(Count)</th>
		              <th>TT(Count)</th>
		              <th>Total(Rs.)</th>
		          </tr>
		        </thead>
		        <tbody>
		        {
			        this.props.report.parkingReports.map(function (sublotStats) {
			        	return(
			          	<tr key={sublotStats.parkingSubLotName+_.random(0, 200)}>
				            <td>{sublotStats.parkingSubLotName}</td>
				            <td>{sublotStats.checkInCount}</td>
				            <td>{sublotStats.checkOutCount}</td>
				            <td>{sublotStats.focCount}</td>
				            <td>{sublotStats.ttCount}</td>
				            <td>{sublotStats.checkInRevenue+sublotStats.checkOutRevenue}</td>
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
function mapStateToProps(state) {
	return {
		userAccess: state.userAccess
	}
}
export default connect(mapStateToProps)(ReportTable);