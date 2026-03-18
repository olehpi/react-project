import { getItemsType, instance, ResponseType } from "./api";

export const usersAPI = {
    async getUsers(currentPage = 1, pageSize = 10) {
        const res = await instance.get<getItemsType>(`users?page=${currentPage}&count=${pageSize}`);
        return res.data;
    },
    async follow(userId: number) {
        const res = await instance.post<ResponseType>(`follow/${userId}`);
        return res.data;
    },
    async unfollow(userId: number) {
        const res = await instance.delete<ResponseType>(`follow/${userId}`);
        return res.data;
    }
}