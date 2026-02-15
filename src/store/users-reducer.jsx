import { updateObjectInArray } from "../utils/validators/object-helpers";
import {usersAPI} from "./../api/api"

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';


let initialState = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId,  "id", {followed: true})    
            };
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId,  "id", {followed: false})  
            };
        case SET_USERS:
            return {
                ...state,
                users: action.users
            };
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage};
        case SET_TOTAL_USERS_COUNT:
            return {...state, totalUsersCount: action.totalUsersCount};  
        case TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.isFetching};  
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            };
        default:
            return state;
    }
}

export const followSuccess = (userId) => ({
    type: 'FOLLOW', userId: userId
});
export const unfollowSuccess = (userId) => ({
    type: 'UNFOLLOW', userId: userId
});
export const setUsers = (users) => ({
    type: 'SET-USERS', users: users
});
export const setCurrentPage = (currentPage) => ({
    type: 'SET_CURRENT_PAGE', currentPage: currentPage
});
export const setTotalUsersCount = (totalUsersCount) => ({
    type: 'SET_TOTAL_USERS_COUNT', totalUsersCount: totalUsersCount
});
export const toggleIsFetching = (isFetching) => ({
    type: 'TOGGLE_IS_FETCHING', isFetching: isFetching
});
export const toggleFollowingInProgress = (isFetching, userId) => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching,
    userId
});

export const getUsersThunkCreator = (page, pageSize) => {
    return async (dispatch) => {
        dispatch(toggleIsFetching(true));
        dispatch(setCurrentPage(page));

        let data = await usersAPI.getUsers(page, pageSize);
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount));
        dispatch(toggleIsFetching(false));
    }
}

export const followThunkCreator = (userId) => {
    return async (dispatch) => {
        const apiMethod = usersAPI.follow.bind(usersAPI);
        const actionCreator = followSuccess;
        followUnfollowFlow(dispatch, userId, apiMethod, actionCreator);
    }
}

export const unfollowThunkCreator = (userId) => {
    return async (dispatch) => {
        const apiMethod = usersAPI.unfollow.bind(usersAPI);
        const actionCreator = unfollowSuccess;
        followUnfollowFlow(dispatch, userId, apiMethod, actionCreator);
    }
}

export const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
    dispatch(toggleFollowingInProgress(true, userId));
    let response = await apiMethod(userId);
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(toggleFollowingInProgress(false, userId));
}

export default usersReducer;