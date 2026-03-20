import { getItemsType, instance, APIResponseType } from "./api";

export const usersAPI = {
    async getUsers(currentPage = 1, pageSize = 10, term: string = '', friend: null | boolean = null) {
        const res = await instance.get<getItemsType>(
            `users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend === null ? '' : `&friend=${friend}`));
        return res.data;
    },
    async follow(userId: number) {
        const res = await instance.post<APIResponseType>(`follow/${userId}`);
        return res.data;
    },
    async unfollow(userId: number) {
        const res = await instance.delete<APIResponseType>(`follow/${userId}`);
        return res.data;
    }
}