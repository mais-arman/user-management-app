import { User } from "../../../shared/types/user";

interface Props {
    user: User;
    onClick?: () => void;
}

export default function UserCard({ user, onClick }: Props) {
    return (
        <div
        onClick={onClick}
        className="p-4 border rounded-xl shadow hover:bg-gray-100 cursor-pointer"
        >
        <h2 className="font-bold text-lg">{user.name}</h2>
        <p className="text-gray-500">{user.email}</p>
        </div>
    );
}