import { useTranslation } from "react-i18next";
import { MAP_CONFIG } from "../../../app/constants/map";

export default function MapPage() {
    const { t } = useTranslation();

    return (
        <div
            style={{ height: `${MAP_CONFIG.HEIGHT}px` }}
            className="w-full rounded-xl overflow-hidden shadow"
        >
            <iframe
                title={t("map")}
                src={MAP_CONFIG.URL(
                    MAP_CONFIG.DEFAULT_LOCATION.lat,
                    MAP_CONFIG.DEFAULT_LOCATION.lng,
                    MAP_CONFIG.ZOOM
                )}
                className="w-full h-full border-0"
                loading="lazy"
            />
        </div>
    );
}