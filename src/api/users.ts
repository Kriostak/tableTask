import axios from 'axios';

import { User, ApiResponse, GetUsersParams } from '../types';

const API_URL = 'https://dummyjson.com/users';

export const fetchUsers = async (params: GetUsersParams): Promise<ApiResponse<User>> => {
    const { page, limit, search } = params;
    const skip = (page - 1) * limit;

    const { data } = await axios.get<{ users: User[]; total: number }>(`${API_URL}${search ? '/search' : ''}`, {
        params: {
            limit, skip,
            ...(search ? { q: search } : {}),
        }
    });

    const filteredUsers = search
        ? data.users.filter(user =>
            user.firstName.includes(search) ||
            user.lastName.includes(search) ||
            user.email.includes(search) ||
            user.username.includes(search))
        : data.users;

    return { users: filteredUsers, total: data.total, page, limit };
};
