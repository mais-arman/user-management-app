export enum Environment {
    LOCAL = "local",
    PRODUCTION = "production",
}

class EnvService {
    private env = import.meta.env;

    get apiUrl(): string {
        return this.env.VITE_API_URL;
    }

    get environment(): Environment {
        return (this.env.VITE_ENV as Environment) || Environment.LOCAL;
    }
}

export const envService = new EnvService();