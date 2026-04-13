import { apiService } from "../../../app/services/api.service";
import { API_ENDPOINTS } from "../../../app/constants/api";
import { User } from "../../../shared/types/user";
import { ERROR_MESSAGES } from "../../../app/constants/errors";

export const fetchUsers = async (): Promise<User[]> => {
    try {
        return apiService.get(API_ENDPOINTS.USERS.LIST);
    } catch {
        throw new Error(ERROR_MESSAGES.FETCH_USERS_FAILED);
    }
};

export const fetchUserById = async (id: number): Promise<User> => {
    try {
        return apiService.get(API_ENDPOINTS.USERS.DETAILS(id));
    } catch {
        throw new Error(ERROR_MESSAGES.FETCH_USER_FAILED);
    }
};