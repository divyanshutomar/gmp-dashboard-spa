import React from 'react';
import {connect} from 'react-redux';
import { push } from 'react-router-redux'

export function requireAuthentication(Component) {

    class AuthenticatedComponent extends React.Component {

        componentWillMount () {
            this.checkAuth(this.props.isAuthenticated);
        }

        componentWillReceiveProps (nextProps) {
            this.checkAuth(nextProps.isAuthenticated);
        }

        checkAuth (isAuthenticated) {
            if (!isAuthenticated) {
                // let redirectAfterLogin = this.props.location.pathname;
                // ?next=${redirectAfterLogin}
                this.props.dispatch(push(`/login`));
            }
        }

        render () {
            return (
                <div>
                    {this.props.isAuthenticated === true
                        ? <Component {...this.props}/>
                        : ''
                    }
                </div>
            )

        }
    }

    const mapStateToProps = (state) => ({
        token: state.user.token,
        userName: state.user.userName,
        isAuthenticated: state.user.isAuthenticated
    });

    return connect(mapStateToProps)(AuthenticatedComponent);

}
