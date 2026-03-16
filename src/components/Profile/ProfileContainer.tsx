import React from 'react';
import classes from './Profile.module.css';
import Profile from './Profile';
import { connect } from "react-redux";
import { getStatus, getUserProfile, updateStatus, savePhoto, saveProfile } from "../../store/profile-reducer";
import { withRouter } from "./withRouter";
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
import { AppStateType } from '../../store/redux-store';

type mapStateToPropsType = ReturnType<typeof mapStateToProps>
type mapDispatchToPropsType = {
  getUserProfile: (userId: string) => void,
  getStatus: (userId: string) => void,
  updateStatus: (status: string) => void,
  savePhoto: (file: File) => void,
  saveProfile: (profile: any) => Promise<any>
}

type RouterPropsType = {
  router: {
    params: {
      userId?: string
    }
    navigate: (to: string) => void
    location: {
      pathname: string
      search: string
      hash: string
    }
  }
}

type PropsType = mapStateToPropsType & mapDispatchToPropsType & RouterPropsType

class ProfileContainer extends React.Component<PropsType> {

  refreshProfile() {
    let userId: string | undefined = this.props.router.params.userId;
    if (!userId) {
      const authorizedId = this.props.autorizedUserId;
      if (!authorizedId) {
        this.props.router.navigate("/login");
        return;
      }
      userId = String(authorizedId);
    }

    if (!userId) {
      console.error("ID should exist in URI params or in state ('authorizedId')");
      throw new Error("ID should exist in URI params or in state ('authorizedId')");
    } else {
      this.props.getUserProfile(userId);
      this.props.getStatus(userId);
    }
  }


  componentDidMount() {
    this.refreshProfile();
  }

  componentDidUpdate(prevProps: PropsType, prevState: PropsType) {
     if (this.props.router.params.userId != prevProps.router.params.userId) {
      this.refreshProfile();
    }
  }

  render() {
    return (
      <div className={classes.content}>
        <Profile {...this.props}
          isOwner={!this.props.router.params.userId}
          profile={this.props.profile} 
          status={this.props.status}
          updateStatus={this.props.updateStatus}
          savePhoto={this.props.savePhoto}
          saveProfile={this.props.saveProfile}
        />
      </div>
    );
  }
}

let mapStateToProps = (state: AppStateType) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  autorizedUserId: state.auth.userId,
  isAuth: state.auth.isAuth
});

export default compose<React.ComponentType<PropsType>>(
  connect(mapStateToProps, { getUserProfile, getStatus, updateStatus, savePhoto, saveProfile }),
  withRouter,
  withAuthRedirect
)(ProfileContainer);
