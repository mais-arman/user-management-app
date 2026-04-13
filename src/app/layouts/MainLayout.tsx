import Navbar from "../../shared/components/layout/Navbar";
import { useAuth } from "../context/AuthContext";
import Loader from "../../shared/components/ui/Loader";

export default function MainLayout({ children }: any) {
    const { user, loading } = useAuth();

    if (loading) return <Loader />;

    return (
        <>
            {user && <Navbar />}
            {children}
        </>
    );
}