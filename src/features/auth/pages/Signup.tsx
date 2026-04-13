import { useSignup } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../app/constants/routes";
import { AuthForm, Field } from "../../../shared/components/forms/AuthForm";
import { useTranslation } from "react-i18next";
import { useState } from "react";

export default function Signup() {
    const { mutate, isPending, error, isError } = useSignup();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const [submitted, setSubmitted] = useState(false);

    const fields: Field<{ name: string; email: string; password: string }>[] = [
        { name: "name", placeholder: t("name") },
        { name: "email", type: "email", placeholder: t("email") },
        { name: "password", type: "password", placeholder: t("password") },
    ];

    const handleSignup = (data: { name: string; email: string; password: string }) => {
        setSubmitted(true);

        mutate(data, {
            onSuccess: () => {
                navigate(ROUTES.USERS);
            },
        });
    };

    return (
        <AuthForm
            title={t("create_account")}
            fields={fields}
            submitText={t("create_account")}
            errorText={
                submitted && isError
                    ? error instanceof Error
                        ? error.message
                        : t("signup_failed")
                    : undefined
            }
            onSubmit={handleSignup}
            isPending={isPending}
        />
    );
}