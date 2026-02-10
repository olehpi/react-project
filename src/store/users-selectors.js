import { createSelector } from "reselect";

const getUsersSelector = (state) => {
  return state.usersPage.users;
}

const getUsers = createSelector(
  getUsersSelector,
  (users) => { 
    console.log('filter');
    return users.filter(u => true) }
)

const getPageSize = (state) => {
  return state.usersPage.pageSize;
}

const getTotalUsersCount = (state) => {
  return state.usersPage.totalUsersCount;
}

const getCurrentPage = (state) => {
  return state.usersPage.currentPage;
}

const getIsFetching = (state) => {
  return state.usersPage.isFetching;
}

const getFollowingInProgress = (state) => {
  return state.usersPage.followingInProgress;
}

export { getUsers, getPageSize, getTotalUsersCount, getCurrentPage, getIsFetching, getFollowingInProgress };