import React from 'react';
import classes from './Profile.module.css';
import Profile from './Profile';
import { connect } from "react-redux";
import {getUserProfile} from "../../store/profile-reducer"; 
import { withRouter } from "./withRouter";
import { withAuthRedirect } from '../../hoc/withAuthRedirect';


class ProfileContainer extends React.Component {

  componentDidMount() {
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = 31828;
    }
    this.props.getUserProfile(userId);
  }
  
  render() {
    return (
      <div className={classes.content}>
        <Profile {...this.props} profile={this.props.profile}/>
      </div>
    );
  }
}

let AuthRedirectComponent = withAuthRedirect(ProfileContainer);

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
});

let WithUrlDataContainerComponent = withRouter(AuthRedirectComponent)

export default connect(mapStateToProps, {getUserProfile})(WithUrlDataContainerComponent);
