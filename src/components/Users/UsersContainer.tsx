import React from "react";
import { connect } from "react-redux";
import {
    followThunkCreator, unfollowThunkCreator,
    getUsersThunkCreator,
    FilterType
} from "../../store/users-reducer";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from "redux";
import { getPageSize, getUsers, getCurrentPage, getFollowingInProgress, getIsFetching, getTotalUsersCount, getUsersFilter } from "../../store/users-selectors";
import { UserType } from "./../../types/types"
import {AppStateType} from "./../../store/redux-store" 


type MapStatePropsType = {
    currentPage: number
    pageSize: number
    isFetching: boolean
    totalUsersCount: number
    followingInProgress: Array<number>
    users: Array<UserType>
    filter: FilterType
}

type MapDispatchPropsType = {
    getUsers: (currentPage: number, pageSize: number, filter: FilterType) => void
    unfollow: (userId: number) => void
    follow: (userId: number) => void
}

type OwnPropsType = {
    pageTitle: string
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

class UsersContainer extends React.Component<PropsType> {

    componentDidMount() {
        let { currentPage, pageSize, filter } = this.props;
        this.props.getUsers(currentPage, pageSize, filter)
    }

    onPageChanged = (pageNumber: number) => {
        let { pageSize, filter } = this.props;
        this.props.getUsers(pageNumber, pageSize, filter)
    };

    onFilterChanged = (filter: FilterType) => {
        const { pageSize } = this.props;
        this.props.getUsers(1, pageSize, filter)
    }
    render() {
        return <>
        <h2>{this.props.pageTitle}</h2>
            {this.props.isFetching ? <Preloader /> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                onFilterChanged={this.onFilterChanged}
                users={this.props.users}
                follow={this.props.follow}
                unfollow={this.props.unfollow}
                followingInProgress={this.props.followingInProgress}
            />
        </>
    }
}

let mapStateToProps = (state: AppStateType) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        filter: getUsersFilter(state)
    };
}

let mapDispatchToProps = {
    follow: followThunkCreator, 
    unfollow: unfollowThunkCreator,
    getUsers:getUsersThunkCreator
}   

export default compose(
    withAuthRedirect,
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>
    (mapStateToProps, mapDispatchToProps),
)(UsersContainer) as React.ComponentType<OwnPropsType>;
