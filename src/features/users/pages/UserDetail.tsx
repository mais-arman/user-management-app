import { useQuery } from "@tanstack/react-query";
import { fetchUserById } from "../api/usersApi";
import Loader from "../../../shared/components/ui/Loader";

interface Props {
    id: number;
}

export default function UserDetail({ id }: Props) {
    const { data, isLoading } = useQuery({
        queryKey: ["user", id],
        queryFn: () => fetchUserById(id),
    });

    if (isLoading) return <Loader />;

    return (
        <div className="p-4 border rounded-xl">
        <h2 className="text-xl font-bold">{data?.name}</h2>
        <p>{data?.email}</p>
        <p>{data?.phone}</p>
        </div>
    );
}