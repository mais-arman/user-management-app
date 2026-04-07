import { User } from "../../../shared/types/user";

export const fetchUsers = async (): Promise<User[]> => {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!res.ok) throw new Error("Error fetching users");
    return res.json();
};

export const fetchUserById = async (id: number): Promise<User> => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    if (!res.ok) throw new Error("Error fetching user");
    return res.json();
};