import { useSignup } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../app/context/AuthContext";
import { ROUTES } from "../../../app/constants/routes";
import { AuthForm, Field } from "../../../shared/components/AuthForm";
import { useTranslation } from "react-i18next";

export default function Signup() {
    const { mutate, isPending, error } = useSignup();
    const { setUser } = useAuth();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const fields: Field<{ name: string; email: string; password: string }>[] = [
        { name: "name", placeholder: t("name") },
        { name: "email", type: "email", placeholder: t("email") },
        { name: "password", type: "password", placeholder: t("password") },
    ];

    const handleSignup = (data: { name: string; email: string; password: string }) => {
        mutate(data, {
        onSuccess: (res) => {
            setUser(res.user);
            navigate(ROUTES.USERS);
        },
        });
    };

    return (
        <AuthForm
            title={t("create_account")}
            fields={fields}
            submitText={t("create_account")}
            errorText={error ? t("signup_failed") : undefined}
            onSubmit={handleSignup}
            isPending={isPending}
        />
    );
}