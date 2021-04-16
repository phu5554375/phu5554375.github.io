import React, { Component } from 'react';
import FuseUtils from 'utils/FuseUtils';
import { matchRoutes } from 'react-router-config';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import AppContext from "AppContext";
import {getRouteDefaultOfLayout} from './authRoles';



class Authorization extends Component {

    constructor(props, context) {
        super(props);
        const {routes} = context;
        this.state = {
            accessGranted: true,
            routes
        };
    }

    

   

    redirectRoute() {
        const {location, userRole, history, user} = this.props;
        const {pathname, state} = location;
        let redirectUrl = state && state.redirectUrl ? state.redirectUrl : '/';
        /*
        User is guest
        Redirect to Login Page
        */
        if (!userRole || userRole.length === 0) {
            history.push({
                pathname: "/login",
                state: { redirectUrl: pathname }
            });
        } else {
            if(redirectUrl === '/') {
                redirectUrl = getRouteDefaultOfLayout(user.layout);
            }
            history.push({
                pathname: redirectUrl
            });
        }
    }

    render() {
        DEBUG(TAG , 'accessGranted is: ' + this.state.accessGranted)
        return this.state.accessGranted ? <React.Fragment>{this.props.children}</React.Fragment> : <NotFound/>;
    }
}

function mapStateToProps({auth}) {
    return {
        userRole: auth.user.listUserRouter,
        user: auth.user.user
    }
}
Authorization.contextType = AppContext;

export default withRouter(connect(mapStateToProps)(Authorization));