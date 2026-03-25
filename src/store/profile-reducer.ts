import { profileAPI } from "../api/profile-api";
import { PostType, ProfileType, PhotosType } from "../types/types";
import { BaseThunkType, InferActionsTypes } from "./redux-store";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';

let initialState = {
    postsData: [
        { id: 1, message: 'Hi, how are you?', likesCount: 12 },
        { id: 2, message: "It's my first post", likesCount: 11 }
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: ''
};

export type initialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsType>;

const profileReducer = (state = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 5,
                message: action.newPostText,
                likesCount: 0
            };
            return {
                ...state,
                postsData: [...state.postsData, newPost]
            };
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            };    
        case SET_STATUS:
            return {
                ...state,
                status: action.status
            };
        case DELETE_POST:
            return {
                ...state,
                postsData: state.postsData.filter(p => p.id != action.postId)
            };
        case SAVE_PHOTO_SUCCESS:
            return {
                ...state,
                profile: {
                    ...state.profile,
                    photos: action.photos
                } as ProfileType
            };
        default:
            return state;
    }
}

export const actions = {
    addPostActionCreator: (newPostText: string) => ({ type: ADD_POST, newPostText } as const),
    setUserProfile: (profile: ProfileType) => ({ type: SET_USER_PROFILE, profile } as const),
    setStatus: (status: string) => ({ type: SET_STATUS, status } as const),
    deletePost: (postId: number) => ({ type: DELETE_POST, postId } as const),
    savePhotoSuccess: (photos: PhotosType) => ({ type: SAVE_PHOTO_SUCCESS, photos } as const)
}

export const getUserProfile = (userId: number): ThunkType => async (dispatch) => {
    let response = await profileAPI.getProfile(userId);
    dispatch(actions.setUserProfile(response));
}

export const getStatus = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getStatus(userId);
    dispatch(actions.setStatus(data));
}

export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    let data= await profileAPI.updateStatus(status);
    if (data.resultCode === 0) {
        dispatch(actions.setStatus(status))
    }
}

export const savePhoto = (file: File): ThunkType => async (dispatch) => {
  let data = await profileAPI.savePhoto(file);
  if (data.resultCode === 0) {
    dispatch(actions.savePhotoSuccess(data.data.photos));
  }
}

export const saveProfile = (profile: ProfileType) => async (dispatch: any, getState: any) => {
    const userId = getState().auth.userId;
    const data = await profileAPI.saveProfile(profile);

    if (data.resultCode === 0) {
        if (userId != null) {
            await dispatch(getUserProfile(userId));        
        } else {
            throw new Error("User ID can't be null");
        }
        return undefined;
    } else {
        return { _error: data.messages[0] };
    }
}


export default profileReducer;
