import React from 'react';
import { Component } from 'react';
import {Navbar,NavItem} from 'react-materialize'

export default class App extends Component {
  render() {
    return (
    	
      	<div>
	      	<Navbar brand='Get My Parking' right>
			  <NavItem href='get-started.html'>Getting started</NavItem>
			  <NavItem href='components.html'>Components</NavItem>
			</Navbar>
	      	React simple starter
      	</div>
    );
  }
}
