import React from 'react';
import Header from './Header';
import { logout } from '../../store/auth-reducer';
import { connect } from "react-redux";

class HeaderContainer extends React.Component {

    render() {
        return <Header {...this.props}> </Header>
    }
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
});

export default connect(mapStateToProps, { logout })(HeaderContainer);
