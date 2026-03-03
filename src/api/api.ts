import axios from "axios";
import { ProfileType } from "../types/types";

const instance = axios.create({
    withCredentials: true,
    baseURL: import.meta.env.VITE_API_BASE,
    headers: {
        "API-KEY": import.meta.env.VITE_API_KEY
    }
});

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => { return response.data })
    },
    follow(userId: number) {
        return instance.post(`follow/${userId}`)
    },
    unfollow(userId: number) {
        return instance.delete(`follow/${userId}`)
    },
    getProfile(userId: number) {
        console.warn('Depricate method. Please use profileAPI.');
        return profileAPI.getProfile(userId);
    }
}

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get(`profile/${userId}`);
    },
    getStatus(userId: number) {
        return instance.get(`profile/status/${userId}`);
    },
    updateStatus(status: string) {
        return instance.put(`profile/status`, { status: status });
    },
    savePhoto(photoFile: File) {
        const formData = new FormData();
        formData.append("image", photoFile);
        return instance.put(`profile/photo`, formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        );
    },
    saveProfile(profile: ProfileType) {
        return instance.put(`profile`, profile);
    }
}

export enum ResultCodesEnum {
    Success = 0,
    Error = 1
}

export enum ResultCodeForCaptchaEnum {
    CaptchaIsRequired = 10
}

type MeResponseType = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: ResultCodesEnum
    messages: Array<string>
}

type LoginResponseType = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: ResultCodesEnum | ResultCodeForCaptchaEnum
    messages: Array<string>
}

export const authAPI = {
    me() {
        return instance.get<MeResponseType>(`auth/me`).then(response => response.data);
    },
    login(email: string, password: string, rememberMe = false, captcha: string | null = null) {
        return instance.post<LoginResponseType>('auth/login', {
            email: email,
            password: password,
            rememberMe: rememberMe,
            captcha: captcha   
        }).then(response => response.data);
    },
    logout() {
        return instance.delete('auth/login');
    }
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get(`security/get-captcha-url`);    
    }
}

