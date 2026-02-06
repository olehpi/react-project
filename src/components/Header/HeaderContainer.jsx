import React from 'react';
import Header from './Header';
import { getAuthUserData, logout } from '../../store/auth-reducer';
import { connect } from "react-redux";
import { authAPI } from '../../api/api';

class HeaderContainer extends React.Component {
    componentDidMount() {
        authAPI.login();
        this.props.getAuthUserData();   
    }

    render() {
        return <Header {...this.props}> </Header>
    }
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login 
});

export default connect(mapStateToProps, {getAuthUserData, logout}) (HeaderContainer);
