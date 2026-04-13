import { useMutation } from "@tanstack/react-query";
import { login, signup } from "../api/authApi";
import { useAuth as useAuthContext } from "../../../app/context/AuthContext";
import { User } from "../../../shared/types/user";

interface AuthResponse {
    access_token: string;
    refresh_token: string;
    user: User;
}

export const useLogin = () => {
    const { login: setAuth, setUser } = useAuthContext();

    return useMutation({
        mutationFn: ({ email, password }: { email: string; password: string }) =>
            login(email, password),

        onSuccess: (data: AuthResponse) => {
            setAuth(data.access_token, data.refresh_token);
            setUser(data.user);
        },
    });
};

export const useSignup = () => {
    const { login: setAuth, setUser } = useAuthContext();

    return useMutation({
        mutationFn: ({ name, email, password }: any) =>
            signup(name, email, password),

        onSuccess: (data: AuthResponse) => {
            setAuth(data.access_token, data.refresh_token);
            setUser(data.user);
        },
    });
};