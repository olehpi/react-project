import { instance, ResponseType } from "./api";
import { ResultCodesEnum, ResultCodeForCaptchaEnum } from "./api";

type LoginResponseDataType = {
    id: number
}

type MeResponseDataType = {
    id: number
    email: string
    login: string
}

export const authAPI = {
    me() {
        return instance.get<ResponseType<MeResponseDataType>>(`auth/me`).then(response => response.data);
    },
    login(email: string, password: string, rememberMe = false, captcha: string | null = null) {
        return instance.post<ResponseType<LoginResponseDataType, ResultCodesEnum | ResultCodeForCaptchaEnum>>('auth/login', {
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
