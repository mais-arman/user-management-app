import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { STORAGE_KEYS } from "../constants/storage";

interface User {
    id: number;
    email: string;
    name?: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (accessToken: string, refreshToken: string) => void;
    logout: () => void;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = async (token: string) => {
        const res = await fetch("http://localhost:8000/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Unauthorized");

        const data = await res.json();
        setUser(data.user);
    };

    const refreshAccessToken = async () => {
        const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
        if (!refreshToken) throw new Error("No refresh token");

        const res = await fetch("http://localhost:8000/auth/refresh", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh_token: refreshToken }),
        });

        if (!res.ok) throw new Error("Refresh failed");

        const data = await res.json();
        localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, data.access_token);

        return data.access_token;
    };

    useEffect(() => {
        const initAuth = async () => {
        const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);

        if (!token) {
            setLoading(false);
            return;
        }

        try {
            await fetchUser(token);
        } catch {
            try {
            const newToken = await refreshAccessToken();
            await fetchUser(newToken);
            } catch {
            logout();
            }
        }

        setLoading(false);
        };

        initAuth();
    }, []);

    const login = (accessToken: string, refreshToken: string) => {
        localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
        localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
    };

    const logout = () => {
        localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, setUser }}>
        {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used inside AuthProvider");
    return context;
};