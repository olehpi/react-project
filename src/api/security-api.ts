import { instance } from "./api";

type getCaptchUrlResponseType = {
    url: string
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get<getCaptchUrlResponseType>(`security/get-captcha-url`).then(res => res.data);    
    }
}

