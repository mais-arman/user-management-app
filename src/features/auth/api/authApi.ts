export interface AuthResponse {
    token: string;
    user: {
        id: number;
        email: string;
        name?: string; 
    };
}

export const login = async (email: string, password: string) => {
    const res = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    if (!res.ok) throw new Error("Login failed");

    return res.json();
};

export const signup = async (name: string, email: string, password: string) => {
    const res = await fetch("http://localhost:8000/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
    });

    if (!res.ok) throw new Error("Signup failed");

    return res.json();
};