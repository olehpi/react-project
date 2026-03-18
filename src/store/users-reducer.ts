import { BaseThunkType, InferActionsTypes } from './redux-store';
import { updateObjectInArray } from "../utils/validators/object-helpers";
import { APIResponseType, ResultCodesEnum } from "../api/api"
import { UserType } from "../types/types";
import { Dispatch } from 'redux';
import { usersAPI } from '../api/users-api';

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number> // array of user iDs
};

export type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>;

const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case "FOLLOW":
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", { followed: true })
            };
        case "UNFOLLOW":
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", { followed: false })
            };
        case "SET_USERS":
            return {
                ...state,
                users: action.users
            };
        case "SET_CURRENT_PAGE":
            return { ...state, currentPage: action.currentPage };
        case "SET_TOTAL_USERS_COUNT":
            return { ...state, totalUsersCount: action.totalUsersCount };
        case "TOGGLE_IS_FETCHING":
            return { ...state, isFetching: action.isFetching };
        case "TOGGLE_IS_FOLLOWING_PROGRESS":
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

export const actions = {
    followSuccess: (userId: number) => ({ type: "FOLLOW", userId } as const),
    unfollowSuccess: (userId: number) => ({ type: "UNFOLLOW", userId } as const), 
    setUsers: (users: Array<UserType>) => ({ type: "SET_USERS", users } as const),
    setCurrentPage: (currentPage: number) => ({ type: "SET_CURRENT_PAGE", currentPage } as const),
    setTotalUsersCount: (totalUsersCount: number) => ({ type: "SET_TOTAL_USERS_COUNT", totalUsersCount } as const),
    toggleIsFetching: (isFetching: boolean) => ({ type: "TOGGLE_IS_FETCHING", isFetching } as const),
    toggleFollowingInProgress: (isFetching: boolean, userId: number) => ({ type: "TOGGLE_IS_FOLLOWING_PROGRESS", isFetching, userId } as const)
}

export const getUsersThunkCreator = (page: number, pageSize: number): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.toggleIsFetching(true));
        dispatch(actions.setCurrentPage(page));

        let data = await usersAPI.getUsers(page, pageSize);
        dispatch(actions.setUsers(data.items as Array<UserType>));
        dispatch(actions.setTotalUsersCount(data.totalCount));
        dispatch(actions.toggleIsFetching(false));
    }
}

export const followThunkCreator = (userId: number): ThunkType => {
    return async (dispatch) => {
        const apiMethod = usersAPI.follow.bind(usersAPI);
        const actionCreator = actions.followSuccess;
        await _followUnfollowFlow(dispatch, userId, apiMethod, actionCreator);
    }
}

export const unfollowThunkCreator = (userId: number): ThunkType => {
    return async (dispatch) => {
        const apiMethod = usersAPI.unfollow.bind(usersAPI);
        const actionCreator = actions.unfollowSuccess;
        await _followUnfollowFlow(dispatch, userId, apiMethod, actionCreator);
    }
}

export const _followUnfollowFlow = async (
    dispatch: Dispatch<ActionsTypes>,
    userId: number,
    apiMethod: (userId: number) => Promise<APIResponseType>,
    actionCreator: (userId: number) => ActionsTypes) => {
        dispatch(actions.toggleFollowingInProgress(true, userId));
        let response = await apiMethod(userId);
        if (response.resultCode == 0) { 
            dispatch(actionCreator(userId)); 
        }
        dispatch(actions.toggleFollowingInProgress(false, userId));
    }

export default usersReducer;