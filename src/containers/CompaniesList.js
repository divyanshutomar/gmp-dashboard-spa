import React,{ Component } from 'react'
import { connect } from 'react-redux'


class CompaniesList extends Component {
	constructor(props){
		super(props);
	}
	companyList(company){
			return(<li key={company.id}>{company.name}</li>);
	};
	
	render(){
		return(
			<ul>
				{this.props.companies.map(this.companyList)}
			</ul>
			);
	}
}

function mapStateToProps({companies}) {
	return ({companies});
}


export default connect(mapStateToProps)(CompaniesList)