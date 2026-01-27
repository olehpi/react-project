import axios from "axios";

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
    }
}
