import React from 'react';
import classes from './Profile.module.css';
import Profile from './Profile';
import axios from 'axios';
import { connect } from "react-redux";
import {setUserProfile} from "../../store/profile-reducer"; 
import { withRouter } from "./withRouter";


class ProfileContainer extends React.Component {

  componentDidMount() {
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = 31828;
    }
    axios.get(`/project/api/1.0/profile/` + userId)
      .then(response => { this.props.setUserProfile(response.data);});
  }
  
  render() {
    return (
      <div className={classes.content}>
        <Profile {...this.props} profile={this.props.profile}/>
      </div>
    );
  }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile
});

let WithUrlDataContainerComponent = withRouter(ProfileContainer)

export default connect(mapStateToProps, {setUserProfile})(WithUrlDataContainerComponent);
