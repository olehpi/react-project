import React from "react";
import { connect } from "react-redux";
import { followThunkCreator, unfollowThunkCreator, toggleFollowingInProgress,
    getUsersThunkCreator
 } from "../../store/users-reducer";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";

class UsersContainer extends React.Component {

    componentDidMount() {
        this.props.getUsersForContainer(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (pageNumber) => {
        this.props.getUsersForContainer(pageNumber, this.props.pageSize)
    };

    render() {
        return <>
        {  this.props.isFetching ? <Preloader/> : null}
        <Users totalUsersCount={ this.props.totalUsersCount}
            pageSize={this.props.pageSize}
            currentPage={this.props.currentPage}
            onPageChanged={this.onPageChanged}
            users={this.props.users}
            follow={this.props.followForContainer}
            unfollow={this.props.unfollowForContainer}
            followingInProgress={this.props.followingInProgress}
            toggleFollowingProgress={this.props.toggleFollowingProgressForContainer}
        />
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
    };
} 

let mapDispatchToProps = {
    followForContainer: followThunkCreator, 
    unfollowForContainer: unfollowThunkCreator,
    toggleFollowingProgressForContainer: toggleFollowingInProgress,
    getUsersForContainer:getUsersThunkCreator
}   

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);
