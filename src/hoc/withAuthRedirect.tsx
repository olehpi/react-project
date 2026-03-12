
import React from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { AppStateType } from '../store/redux-store';
import { JSX } from 'react/jsx-runtime';


let mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth
});

export const withAuthRedirect = (Component: JSX.IntrinsicAttributes) => {
    class RedirectComponent extends React.Component {
        render() {
            if (!this.props.isAuth) {
                return <Navigate to={'/login'} replace></Navigate>
            }
            return <Component {...this.props} />
        }
    }

    let ConnectedAuthRedirectComponent = connect(mapStateToProps)(RedirectComponent);

    return ConnectedAuthRedirectComponent;
}
