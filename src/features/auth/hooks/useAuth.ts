import { useMutation } from "@tanstack/react-query";
import { login, signup } from "../api/authApi";
import { useAuth as useAuthContext } from "../../../app/context/AuthContext";

export const useLogin = () => {

    const { login: setAuth } = useAuthContext();

    return useMutation({
        mutationFn: ({ email, password }: { email: string; password: string }) =>
        login(email, password),

        onSuccess: (data) => {
        setAuth(data.access_token, data.refresh_token);
        },
    });
};

export const useSignup = () => {

    const { login: setAuth } = useAuthContext();

    return useMutation({
        mutationFn: ({ name, email, password }: any) =>
        signup(name, email, password),

        onSuccess: (data) => {
        setAuth(data.access_token, data.refresh_token);
        },
    });
};