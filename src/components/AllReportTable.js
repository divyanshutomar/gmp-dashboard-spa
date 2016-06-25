import React from 'react'

export const AllReportTable = (props) => {
	return(
	<div className="row">
        <div className="col s12 m8 l8">
          <div className="card blue-grey darken-1">
            <div className="card-content white-text">
              <span className="card-title">{props.report.parkingSubLotName}</span>              
		      <table className="responsive-table">
		        <thead>
		          <tr>
		              <th>In(Count)</th>
		              <th>Out(Count)</th>
		              <th>FOC(Count)</th>
		              <th>TT(Count)</th>
		              <th>Total</th>
		          </tr>
		        </thead>
		        <tbody>
	          	<tr>
		            <td>{props.report.checkInCount}</td>
		            <td>{props.report.checkOutCount}</td>
		            <td>{props.report.focCount}</td>
		            <td>{props.report.ttCount}</td>
		            <td>{props.report.checkInCount+props.report.checkOutCount+props.report.focCount+props.report.ttCount}</td>
	          	</tr>
		        </tbody>
		       </table>   
            </div>
          </div>
        </div>
      </div>
     );
} 