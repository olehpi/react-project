import axios from "axios";

export const instance = axios.create({
    withCredentials: true,
    baseURL: import.meta.env.VITE_API_BASE,
    headers: {
        "API-KEY": import.meta.env.VITE_API_KEY
    }
});

export enum ResultCodesEnum {
    Success = 0,
    Error = 1
}

export enum ResultCodeForCaptchaEnum {
    CaptchaIsRequired = 10
}

export type getItemsType = {
    items: Array<{
        id: number  
    }>
    totalCount: number,
    error: string | null
}

export type APIResponseType<D = {}, RC = ResultCodesEnum > = {
    data: D
    resultCode: RC
    messages: Array<string>
}
