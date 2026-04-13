import { apiService } from "../../../app/services/api.service";
import { API_ENDPOINTS } from "../../../app/constants/api";

export const login = async (email: string, password: string) => {
    return apiService.post(API_ENDPOINTS.AUTH.LOGIN, { email, password });
};

export const signup = async (name: string, email: string, password: string) => {
    return apiService.post(API_ENDPOINTS.AUTH.SIGNUP, { name, email, password });
};