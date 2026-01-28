import axios from "axios";

const apiKey = import.meta.env.VITE_API_KEY;

const instance = axios.create({
    withCredentials: true,
    baseURL: `/project/api/1.0/`,
    headers: {
        "API-KEY": apiKey
    }
});

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => { return response.data })
    },
    follow(userId) {
        return instance.post(`follow/${userId}`)
    },
    unfollow(userId) {
        return instance.delete(`follow/${userId}`)
    },
    getProfile(userId) {
        return instance.get(`profile/${userId}`);
    }
}

export const authAPI = {
    me() {
        return instance.get(`auth/me`)
    },
    login() {
        instance.post('auth/login', {
            email: import.meta.env.VITE_EMAIL,
            password: import.meta.env.VITE_PASSWORD,
            rememberMe: true
        }).then(response => {});
    }
}
