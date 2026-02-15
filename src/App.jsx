import React,  { Suspense } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { Routes, Route } from 'react-router-dom';
import UsersContainer from './components/Users/UsersContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import LoginPage from './components/login/login';
import { connect } from "react-redux";
import { withRouter } from './components/Profile/withRouter';
import { compose } from 'redux';
import { initializeApp } from './store/app-reducer';
import Preloader from './components/common/Preloader/Preloader';
import { withSuspense } from './hoc/withSuspense';

const DialogsContainer = React.lazy( () => import('./components/Dialogs/DialogsContainer') );
const ProfileContainer = React.lazy( () => import('./components/Profile/ProfileContainer') );

class App extends React.Component {
  componentDidMount() {
    this.props.initializeApp();
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />;
    }

    const DialogsWithSuspense = withSuspense(DialogsContainer);
    const ProfileWithSuspense = withSuspense(ProfileContainer);

    return (
      <div className="app-wrapper">
        <HeaderContainer />
        <Navbar />
        <div className="app-wrapper-content">
          {/*<Suspense fallback={<Preloader />}> */}
            <Routes>
              <Route path="/dialogs/*" element={<DialogsWithSuspense/>} />
              <Route path="/profile/:userId?" element={<ProfileWithSuspense/>} />
              <Route path="/users" element={<UsersContainer />} />
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          {/*</Suspense> */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
});

export default compose(
  withRouter,
  (connect(mapStateToProps, { initializeApp }))
)(App);
