export const MAP_CONFIG = {
    HEIGHT: 700,
    ZOOM: 10,

    DEFAULT_LOCATION: {
        lat: 31.7683,
        lng: 35.2137,
    },

    URL: (lat: number, lng: number, zoom: number) =>
        `https://www.google.com/maps?q=${lat},${lng}&z=${zoom}&output=embed`,
};