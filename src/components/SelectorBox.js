import React from 'react'
import { selectCompany,selectParking,selectParkingLot,selectUser } from '../actions/actions_reports'
import { connect } from 'react-redux';
import { checkCompanyAccessLevel } from '../utils'
import _ from 'lodash'


class SelectorBox extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			companies: props.companyAccess,
			parkings: props.parkingAccess,
			parkingLots: props.parkingLotsAccess,
			selectedCid: null,
			selectedPid: null,
			selectedUser: props.usernames[0]
		}
		this.changeCompanySelect = this.changeCompanySelect.bind(this)
		this.changeParkingSelect = this.changeParkingSelect.bind(this)
		this.changeParkingLotSelect = this.changeParkingLotSelect.bind(this)
		this.changeUserSelect = this.changeUserSelect.bind(this)
	}

	componentWillMount(){
		this.props.selectUser(this.props.usernames[0]);
	}
	componentDidMount(){
		$(document).ready(function() {
		    $('select').material_select();
		});
	}
	changeCompanySelect(event){
		let selectedId = event.target.value
		if (selectedId == "null") {
			let allC = this.props.companyAccess;
			let allP = this.props.parkingAccess;
			let allPL = this.props.parkingLotsAccess;
			this.setState({
				companies: allC,
				parkings: allP,
				parkingLots: allPL,
				selectedCid: selectedId 
			})
		} else {
			let selectedCompany = _.find(this.props.companyAccess,(company)=>company.id==selectedId)
			this.setState({
				parkings: selectedCompany.parkings,
				parkingLots: selectedCompany.parkingLots,
				selectedCid: selectedId
			})
		}
		this.props.selectCompany(selectedId)
	}

	changeParkingSelect(event){
		let selectedId = event.target.value
		if (selectedId == "null") {
			if(this.state.selectedCid=="null"){
				this.setState({
					parkings: this.props.parkingAccess,
					parkingLots: this.props.parkingLotsAccess
				})
			} else{
				let selectedCompany = _.find(this.props.companyAccess,(company)=>company.id==this.state.selectedCid)
				let stateP = selectedCompany.parkings;
				let statePL = selectedCompany.parkingLots;
				this.setState({
					parkings: stateP,
					parkingLots: statePL,
					selectedPid: selectedId
				})
			}	
		} else {
			let selectedParking = _.find(this.props.parkingAccess,(parking)=> parking.id==selectedId)
			this.setState({
				parkingLots: selectedParking.parkingLots,
				selectedPid: selectedId
			})
		}	
		this.props.selectParking(selectedId)
	}
	changeParkingLotSelect(event){
		let selectedId = event.target.value
		if (selectedId == "null") {
			if (this.state.selectedPid=="null") {
				if (this.state.selectedCid=="null"){
					this.setState({
						parkingLots: this.props.parkingLotsAccess
					})
				} else {
					let selectedCompany = _.find(this.props.companyAccess,(company)=>company.id==this.state.selectedCid)
					this.setState({
						parkingLots: selectedCompany.parkingLots
					})
				}
			} else {
				let selectedParking = _.find(this.props.parkingAccess,(parking)=> parking.id==this.state.selectedPid)
				let statePL = selectedParking.parkingLots
				this.setState({
					parkingLots: statePL
				})
			}		
		}
		this.props.selectParkingLot(selectedId)
	}
	changeUserSelect(event){
		let selectedUser = event.target.value
		this.setState({
			selectedUser
		})
		this.props.selectUser(selectedUser)
	}
	render() {
		return (
			<div className="row">
				{
					this.props.isUserWise ?
					<div className="input-field col s12 m3">			    
						<select value={this.state.selectedUser} className="browser-default" onChange={this.changeUserSelect}>
							{
								this.props.usernames.map(function (username) {
									return (<option key={username} value={username}>{username}</option>)	
								})
							}
						</select>

				  	</div>
				  	:""
			  	}
				{
					checkCompanyAccessLevel(this.props.userAccesses) ?
					<div className="input-field col s12 m3">			    
						<select className="browser-default" onChange={this.changeCompanySelect}>
							<option value="null"  defaultValue>All Companies</option>
							{
								this.state.companies.map(function (option) {
								return (<option key={option.id} value={option.id}>{option.name}</option>)
								})
							}
						</select>
				  	</div>
				  	:""
			  	}
			  	<div className="input-field col s12 m3">			    
			  		<select className="browser-default" onChange={this.changeParkingSelect}>
			  			<option value="null" defaultValue>All Parkings</option>
						{	
							this.state.parkings.map(function (option) {
							return (<option key={option.id} value={option.id}>{option.name}</option>)
							})
						}
			  		</select>
			  	</div>
			  	<div className="input-field col s12 m3">			    
			  		<select className="browser-default" onChange={this.changeParkingLotSelect}>
			  			<option value="null" defaultValue>All ParkingLots</option>
						{	
							this.state.parkingLots.map(function (option) {
							return (<option key={option.id} value={option.id}>{option.name}</option>)
							})
						}
			  		</select>
			  	</div>
		  	</div>
			);
	}
}

function mapStateToProps(state) {
	return ({
		userAccesses : state.user.userAccess.userAccesses,
		companyAccess: state.userAccess.companyAccess,
		parkingAccess: state.userAccess.parkingAccess,
		parkingLotsAccess: state.userAccess.parkingLotsAccess,
		isUserWise: state.userReports.isUserWise,
		usernames: state.userReports.users
	});
}

export default connect(mapStateToProps, { selectCompany,selectParking,selectParkingLot,selectUser })(SelectorBox);