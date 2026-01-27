import React from "react";
import { connect } from "react-redux";
import { follow, setCurrentPage, setUsers, unfollow, setTotalUsersCount, toggleIsFetching } from "../../store/users-reducer";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import { usersAPI } from "../../api/api";

class UsersContainer extends React.Component {

    componentDidMount() {
        this.props.toggleIsFetching(true);
        usersAPI.getUsers(this.props.currentPage, this.props.pageSize).then(data => {
             this.props.setUsers(data.items);
             this.props.setTotalUsersCount(data.totalCount);
             this.props.toggleIsFetching(false);
         });
    }

    onPageChanged = (pageNumber) => {
        this.props.toggleIsFetching(true);
        this.props.setCurrentPage(pageNumber)
        usersAPI.getUsers(pageNumber, this.props.pageSize).then(data => {
                this.props.setUsers(data.items);
                this.props.toggleIsFetching(false);
            });
    };
    render() {
        return <>
        {  this.props.isFetching ? <Preloader/> : null}
        <Users totalUsersCount={ this.props.totalUsersCount}
            pageSize={this.props.pageSize}
            currentPage={this.props.currentPage}
            onPageChanged={this.onPageChanged}
            users={this.props.users}
            follow={this.props.follow}
            unfollow={this.props.unfollow}
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
        isFetching: state.usersPage.isFetching
    };
} 

let mapDispatchToProps = { follow, unfollow, setUsers, setCurrentPage, setTotalUsersCount, toggleIsFetching }   

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);
