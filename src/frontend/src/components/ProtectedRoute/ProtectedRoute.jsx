
import React from 'react'
import { Redirect } from 'react-router-dom'
import { getUser } from "../../services/Auth";

class ProtectedRoute extends React.Component {
    render() {
        const Component = this.props.component;
        return getUser() ? (
            <Component { ...this.props } />
        ) : (
            <Redirect to={{ pathname: '/accounts' }} />
        );
    }
}

export default ProtectedRoute;