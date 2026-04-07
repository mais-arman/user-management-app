import { useAuth } from "../../app/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Navbar() {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <div className="flex justify-between">
        <button onClick={() => navigate("/users")}>{t("users")}</button>
        <button onClick={() => navigate("/map")}>{t("map")}</button>
        <button onClick={logout}>{t("logout")}</button>
        </div>
    );
}