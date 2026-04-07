import { useTranslation } from "react-i18next";

export default function MapPage() {
    const { t } = useTranslation();
    return (
        <div className="w-full h-[700px] rounded-xl overflow-hidden shadow">
        <iframe
            title={t("map")}
            src="https://www.google.com/maps?q=31.7683,35.2137&z=10&output=embed"
            className="w-full h-full border-0"
            loading="lazy"
        ></iframe>
        </div>
    );
}