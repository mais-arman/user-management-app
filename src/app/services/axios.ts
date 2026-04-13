import axios from "axios";
import { envService } from "./env.service";
import { STORAGE_KEYS } from "../constants/storage";
import { API_ENDPOINTS } from "../constants/api";
import { HTTP_STATUS } from "../constants/http";
import { ROUTES } from "../constants/routes";

export const axiosInstance = axios.create({
    baseURL: envService.apiUrl,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (error) prom.reject(error);
        else prom.resolve(token);
    });

    failedQueue = [];
};

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        const isAuthRoute =
            originalRequest.url?.includes(API_ENDPOINTS.AUTH.LOGIN) ||
            originalRequest.url?.includes(API_ENDPOINTS.AUTH.SIGNUP) ||
            originalRequest.url?.includes(API_ENDPOINTS.AUTH.REFRESH);

        if (
            error.response?.status === HTTP_STATUS.UNAUTHORIZED &&
            !originalRequest._retry &&
            !isAuthRoute
        ) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        return axiosInstance(originalRequest);
                    })
                    .catch((err) => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);

            try {
                const res = await axios.post(
                    `${envService.apiUrl}${API_ENDPOINTS.AUTH.REFRESH}`,
                    { refresh_token: refreshToken }
                );

                const newToken = res.data.access_token;

                localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, newToken);

                axiosInstance.defaults.headers.Authorization = `Bearer ${newToken}`;

                processQueue(null, newToken);

                return axiosInstance(originalRequest);
            } catch (err) {
                processQueue(err, null);

                localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
                localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);

                window.location.href = ROUTES.LOGIN;

                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);