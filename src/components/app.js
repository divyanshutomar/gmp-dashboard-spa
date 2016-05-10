import React from 'react';
import { Component } from 'react';
import {Navbar,NavItem} from 'react-materialize'
import { connect } from 'react-redux'

import Path from '../api.js'
import CompaniesList from '../containers/CompaniesList'
import { bindActionCreators } from 'redux'
import { fetchCompanies } from '../actions/index'

class App extends Component {
  
  render() {
    return (
    	   
      	<div>
  	      <Navbar brand='Get My Parking' right>
      			  <NavItem href='get-started.html'>Getting started</NavItem>
      			  <NavItem href='components.html'>Components</NavItem>
  			  </Navbar>
          <button className="btn" onClick={this.props.fetchCompanies}>Get It!</button>
  	      <CompaniesList />
      	</div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return ( bindActionCreators ({fetchCompanies},dispatch));
}

export default connect(null,mapDispatchToProps)(App);
