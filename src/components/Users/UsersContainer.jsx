import { connect } from "react-redux";
import Users from "./Users";
import { followAC, setCurrentPageAC, setUsersAC, unfollowAC, setTotalUsersCountAC } from "../../store/users-reducer";

let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage
    };
}       
let mapDispatchToProps = (dispatch) => {
    debugger;
    return {
        follow: (userId) => {       
            dispatch(followAC(userId));
        },
        unfollow: (userId) => {
            dispatch(unfollowAC(userId));
        },
        setUsers: (users) => {
            dispatch(setUsersAC(users));
        },
        setCurrentPage: (pageNumber) => {
            dispatch(setCurrentPageAC(pageNumber))
        },
        setTotalUsersCount: (totalCount) => {
            dispatch(setTotalUsersCountAC(totalCount))
        }
    };
}   

export default connect(mapStateToProps, mapDispatchToProps)(Users);
