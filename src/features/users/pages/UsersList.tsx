import { useUsers } from "../hooks/useUsers";
import UserCard from "../components/UserCard";
import Loader from "../../../shared/components/Loader";

export default function UsersList() {
    const { data, isLoading, error } = useUsers();

    if (isLoading) return <Loader />;
    if (error) return <p>Error</p>;

    return (
        <div className="space-y-3">
        {data?.map(user => (
            <UserCard key={user.id} user={user} />
        ))}
        </div>
    );
}