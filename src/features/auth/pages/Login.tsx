import { useLogin } from "../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../../app/context/AuthContext";
import { ROUTES } from "../../../app/constants/routes";
import { AuthForm, Field } from "../../../shared/components/AuthForm";
import { useTranslation } from "react-i18next";

export default function Login() {
  const { mutate, isPending, error } = useLogin();
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const fields: Field<{ email: string; password: string }>[] = [
    { name: "email", type: "email", placeholder: t("email") },
    { name: "password", type: "password", placeholder: t("password") },
  ];

  const handleLogin = (data: { email: string; password: string }) => {
    mutate(data, {
      onSuccess: (res) => {
        setUser(res.user);
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
          errorText={error ? t("login_failed") : undefined}
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