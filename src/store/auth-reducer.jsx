import {authAPI, securityAPI} from '../api/api'
import { FORM_ERROR } from 'final-form';

const SET_USER_DATA = '/auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = '/auth/SET_CAPTCHA_URL_SUCCESS';

let initialState = {
      userId: null,
      email: null,
      login: null,
      isAuth: false,
      captchaUrl: null // if null, then captcha is not required
};

const authReducer = (state = initialState, action) => {
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

export const getCaptchaUrlSuccess = (captchaUrl) => ({
    type: GET_CAPTCHA_URL_SUCCESS,
    payload: { captchaUrl }
});

export const setAuthUserData = (userId, email, login, isAuth) => (
    {
        type: SET_USER_DATA,
        payload: { userId, email, login, isAuth }
    }
);

export const getAuthUserData = () => async (dispatch) => {
    let response = await authAPI.me();
    if (response.data.resultCode === 0) {
        let { id, email, login } = response.data.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
    return response;;
}

export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
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

export const getCaptchaUrl = () => async (dispatch) => {
    const response = await securityAPI.getCaptchaUrl();
    const captchaUrl = response.data.url;
    dispatch(getCaptchaUrlSuccess(captchaUrl));
}

export const logout = () => async (dispatch) => {
    let response = await authAPI.logout();
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }
    return response;
}

export default authReducer;
