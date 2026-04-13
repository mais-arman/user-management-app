import { useLogin } from "../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import { ROUTES } from "../../../app/constants/routes";
import { AuthForm, Field } from "../../../shared/components/forms/AuthForm";
import { useTranslation } from "react-i18next";
import { useState } from "react";

export default function Login() {
  const { mutate, isPending, error, isError } = useLogin();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [submitted, setSubmitted] = useState(false);

  const fields: Field<{ email: string; password: string }>[] = [
    { name: "email", type: "email", placeholder: t("email") },
    { name: "password", type: "password", placeholder: t("password") },
  ];

  const handleLogin = (data: { email: string; password: string }) => {
    setSubmitted(true);

    mutate(data, {
      onSuccess: () => {
        navigate(ROUTES.USERS);
      },
    });
  };

  return (
    <>
      <AuthForm
        title={t("welcome_back")}
        fields={fields}
        submitText={t("login")}
        errorText={
          submitted && isError
            ? error instanceof Error
              ? error.message
              : t("login_failed")
            : undefined
        }
        onSubmit={handleLogin}
        isPending={isPending}
      />

      <p className="text-center mt-2">
        {t("signup")}{" "}
        <Link to={ROUTES.SIGNUP} className="text-blue-500 underline">
          {t("signup")}
        </Link>
      </p>
    </>
  );
}