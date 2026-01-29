import React from 'react';
import classes from './Profile.module.css';
import Profile from './Profile';
import { connect } from "react-redux";
import {getUserProfile} from "../../store/profile-reducer"; 
import { withRouter } from "./withRouter";
import { Navigate } from 'react-router-dom';


class ProfileContainer extends React.Component {

  componentDidMount() {
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = 31828;
    }
    this.props.getUserProfile(userId);
  }
  
  render() {
    if (!this.props.isAuth) {
      return <Navigate to={'/login'} replace></Navigate>
    }
    return (
      <div className={classes.content}>
        <Profile {...this.props} profile={this.props.profile}/>
      </div>
    );
  }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    isAuth: state.auth.isAuth
});

let WithUrlDataContainerComponent = withRouter(ProfileContainer)

export default connect(mapStateToProps, {getUserProfile})(WithUrlDataContainerComponent);
