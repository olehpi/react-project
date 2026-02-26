import {authAPI, securityAPI} from '../api/api'
import { FORM_ERROR } from 'final-form';

const SET_USER_DATA = '/auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = '/auth/SET_CAPTCHA_URL_SUCCESS';

type InitialStateType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
    captchaUrl: string | null
};

let initialState: InitialStateType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null
};

const authReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
}

type getCaptchaUrlSuccess = {
    type: typeof GET_CAPTCHA_URL_SUCCESS,
    payload: { captchaUrl: string }
}

export const getCaptchaUrlSuccess = (captchaUrl: string) => ({
    type: GET_CAPTCHA_URL_SUCCESS,
    payload: { captchaUrl }
});


type setAuthUserDataActionPayloadType = {
    userId: number|null
    email: string|null
    login: string|null
    isAuth: boolean
}

type setAuthUserDataActionType = {
    type: typeof SET_USER_DATA
    payload: setAuthUserDataActionPayloadType
}

export const setAuthUserData = (userId: number|null, email: string|null, login: string|null, isAuth: boolean):  setAuthUserDataActionType => (
    {
        type: SET_USER_DATA,
        payload: { userId, email, login, isAuth }
    }
);

export const getAuthUserData = () => async (dispatch: any) => {
    let response = await authAPI.me();
    if (response.data.resultCode === 0) {
        let { id, email, login } = response.data.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
    return response;
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: null | undefined) => async (dispatch: any) => {
    let response = await authAPI.login(email, password, rememberMe, captcha);
    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData());
        return undefined;
    } else {
        if (response.data.resultCode === 10) {
            dispatch(getCaptchaUrl());
            return { [FORM_ERROR]: 'Captcha is required' };
        }
        const message =
            response.data.messages.length > 0
                ? response.data.messages[0]
                : "Some error";

        return { [FORM_ERROR]: message };
    }
}

export const getCaptchaUrl = () => async (dispatch: any) => {
    const response = await securityAPI.getCaptchaUrl();
    const captchaUrl = response.data.url;
    dispatch(getCaptchaUrlSuccess(captchaUrl));
}

export const logout = () => async (dispatch: any) => {
    let response = await authAPI.logout();
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }
    return response;
}

export default authReducer;
