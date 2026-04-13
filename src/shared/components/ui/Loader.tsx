import { useTranslation } from "react-i18next";

export default function Loader() {
    const { t } = useTranslation();

    return (
        <div className="text-center py-4 text-gray-500">
        {t("loading")}
        </div>
    );
}