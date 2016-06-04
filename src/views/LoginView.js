import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions';

class LoginView extends React.Component {

  constructor(props) {
    super(props);
    // const redirectRoute = this.props.location.query.next || '/';
    this.state = {
      email: '',
      password: '',
      // redirectTo: redirectRoute
    };
  }

  login(e) {
      e.preventDefault();
      this.props.actions.loginUser(this.state.email, this.state.password);
  }
  emailC (event) {
    this.setState({email:event.target.value});
  }
  passC (event) {
    this.setState({password:event.target.value});
  }
  render () {
    return(
      <div className="container">  
              <h3 className="center-align">Login</h3>
              <div className="row">
                  <form onSubmit={this.login.bind(this)}>
                      <div className="row">
                          <div className="input-field col s12">
                              <input 
                              id="email" 
                              type="text" 
                              value={this.state.email} 
                              onChange={this.emailC.bind(this)}
                              disabled={this.props.isAuthenticating} 
                              className="validate"/>
                              <label for="email">Email</label>
                          </div>
                      </div>
                      <div className="row">
                          <div className="input-field col s12">
                              <input 
                              id="pass" 
                              type="password" 
                              value={this.state.password} 
                              onChange={this.passC.bind(this)} 
                              disabled={this.props.isAuthenticating}
                              className="validate"/>
                              <label for="pass">Password</label>
                          </div>
                      </div>
                      <div className="divider"></div>
                      <div className="row">
                          <div className="col m12">
                              <p className="right-align">
                                  <input 
                                  className="btn btn-large waves-effect waves-light" 
                                  type="submit" 
                                  disabled={this.props.isAuthenticating}
                                  name="action"/>
                              </p>
                          </div>
                      </div>
                  </form>  
              </div>
      </div>      
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticating   : state.user.isAuthenticating,
  statusText         : state.user.statusText
});

const mapDispatchToProps = (dispatch) => ({
  actions : bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);
