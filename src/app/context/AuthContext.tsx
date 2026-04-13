import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { STORAGE_KEYS } from "../constants/storage";
import { apiService } from "../services/api.service";
import { API_ENDPOINTS } from "../constants/api";
import { User } from "../../shared/types/user";
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

    const fetchUser = async () => {
        const data = await apiService.get(API_ENDPOINTS.AUTH.ME);
        setUser(data.user);
    };

    const refreshAccessToken = async () => {
        const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);

        const data = await apiService.post(API_ENDPOINTS.AUTH.REFRESH, {
            refresh_token: refreshToken,
        });

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
                await fetchUser();
            } catch {
                try {
                    await refreshAccessToken();
                    await fetchUser();
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