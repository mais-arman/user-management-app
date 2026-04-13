export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: "/auth/login",
        SIGNUP: "/auth/signup",
        ME: "/auth/me",
        REFRESH: "/auth/refresh",
    },

    USERS: {
        LIST: "/users",
        DETAILS: (id: number) => `/users/${id}`,
    },
};