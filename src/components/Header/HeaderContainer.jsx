import React from 'react';
import Header from './Header';
import axios from 'axios';
import { setAuthUserData } from '../../store/auth-reducer';
import { connect } from "react-redux";

class HeaderContainer extends React.Component {
    componentDidMount() {
        const email = import.meta.env.EMAIL;
        const password = import.meta.env.PASSWORD;

        axios.post('/project/api/1.0/auth/login', {
            email: email,
            password: password,
            rememberMe: true
        }, { withCredentials: true }).then(response => {

        });

        axios.get(`/project/api/1.0/auth/me`, { withCredentials: true })
            .then(response => {
                if (response.data.resultCode === 0) {
                    let { id, email, login } = response.data.data;
                    this.props.setAuthUserData(id, email, login);
                }
            });
    }

    render() {
        return <Header {...this.props}> </Header>
    }
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login 
});

export default connect(mapStateToProps, {setAuthUserData}) (HeaderContainer);
