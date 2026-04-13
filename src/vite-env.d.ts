/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_URL: string;
    readonly VITE_ENV: "local" | "production";
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}