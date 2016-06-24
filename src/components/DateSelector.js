import React from 'react'
import {connect} from 'react-redux';
import { getUserReport } from '../actions'

class DateSelector extends React.Component {
  	constructor(props) {
        super(props);
        this.state = {
          minDate: null,
          maxDate: null,
          userWise: false
        }
        this.handleDateChange = this.handleDateChange.bind(this)
        this.handleUserToggle = this.handleUserToggle.bind(this)
    	}
    componentDidMount(){
       $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15, // Creates a dropdown of 15 years to control year
        closeOnSelect: true,
        onClose: this.handleDateChange,
        onStart: function ()
            {
                var date = new Date();
                this.set('select',[date.getFullYear(), date.getMonth(), date.getDate()]);
            }
        });
    }

  	handleDateChange(){
      let startDate =$('#startdate').pickadate().pickadate('picker').get('select').obj;
      let endDate =$('#enddate').pickadate().pickadate('picker').get('select').obj;
      startDate.setHours(0,0,0,0);
      endDate.setHours(23,59,59,999);
      this.setState({
        minDate: startDate.toISOString(),
        maxDate: endDate.toISOString()
      });
  	 };

  	// handleChangeMinTime(event, time){
   //    let newTime = time.getTime();
   //    currDate = this.state.minDate
	  // 	this.setState({
   //      minDate: currDate.setTime(newTime)
	  // 	});
  	// };

  	// handleChangeMaxTime(event, time){
   //    let newTime = time.getTime();
   //    currDate = this.state.maxDate
	  // 	this.setState({
	  // 		maxDate: currDate.setTime(newTime)
	  // 	});
   //    console.log(this.state.maxDate)
  	// };
    handleReportsClick(){
      this.props.getUserReport(this.state.minDate,this.state.maxDate,this.state.userWise);
    }
    handleUserToggle(){
      this.setState({
        userWise: $('#userWise').prop('checked')
      })
    }
  	render() {
    return (
          <div className="row">
            <div className="col s12 m4">
            <label>From</label>
            <input 
            type="date" 
            placeholder="Start Date" 
            className="datepicker"
            id="startdate"          
            />
            </div>
            <div className="col s12 m4">
            <label>To</label>
            <input 
            type="date" 
            placeholder="End Date" 
            id="enddate"
            className="datepicker"           
            />
            </div>
            <div className="col s12 m4">
            <div className="row">
            <a 
            className="waves-effect waves-light btn" 
            onClick={this.handleReportsClick.bind(this)}>
            Get Reports
            </a>
            </div>
            <div className="row">
            <div className="switch">
              <label>
                All Users
                <input type="checkbox" id="userWise" onChange={this.handleUserToggle}/>
                <span className="lever"></span>
                User Wise
              </label>
            </div>
            </div>
            </div>
          </div>
      );
    }
}

export default connect(null,{ getUserReport })(DateSelector);