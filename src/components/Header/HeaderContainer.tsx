import React from 'react';
import Header, { PropsType } from './Header';
import { logout } from '../../store/auth-reducer';
import { connect } from "react-redux";
import { AppStateType } from '../../store/redux-store';

class HeaderContainer extends React.Component<PropsType> {

    render() {
        return <Header {...this.props}> </Header>
    }
}

const mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
});

export default connect(mapStateToProps, { logout })(HeaderContainer);
