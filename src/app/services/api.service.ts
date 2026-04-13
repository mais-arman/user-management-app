import { axiosInstance } from "./axios";
import { ERROR_MESSAGES } from "../constants/errors";

class ApiService {
    private handleError(error: any): never {
        const message =
            error?.response?.data?.message || ERROR_MESSAGES.API_ERROR;

        throw new Error(message);
    }

    async get<T = any>(url: string): Promise<T> {
        try {
            const res = await axiosInstance.get(url);
            return res.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    async post<T = any>(url: string, body?: any): Promise<T> {
        try {
            const res = await axiosInstance.post(url, body);
            return res.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    async put<T = any>(url: string, body?: any): Promise<T> {
        try {
            const res = await axiosInstance.put(url, body);
            return res.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    async delete<T = any>(url: string): Promise<T> {
        try {
            const res = await axiosInstance.delete(url);
            return res.data;
        } catch (error) {
            this.handleError(error);
        }
    }
}

export const apiService = new ApiService();