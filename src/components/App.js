import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {logoutAndRedirect} from '../actions';

class App extends React.Component {   

    render () {
        return (
            <div>
                <nav className="green">
                    <div className="nav-wrapper" id ="navbar-gmp">
                        <Link to="/" className="brand-logo">Get My Parking</Link>
                        {this.props.isAuthenticated ?
                            <ul id="nav-mobile" className="right hide-on-med-and-down">
                                <li><a>Welcome {this.props.username}</a></li> 
                                <li><a href='#' onClick={() => this.props.logoutAndRedirect()}>Logout</a></li>
                            </ul>   : 
                            <ul id="nav-mobile" className="right hide-on-med-and-down">
                                <li><Link to='/login'>Login</Link></li>
                            </ul>
                        }                       
                    </div>
                </nav>
                <div className='container'>
                    <div className='row'>
                        <div className='col s12'>
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
     isAuthenticated: state.user.isAuthenticated,
     username: state.user.userName
    };   
}
function mapDispatchToProps(dispatch) {
    return (bindActionCreators({logoutAndRedirect},dispatch));
}
export default connect(mapStateToProps,mapDispatchToProps)(App)

