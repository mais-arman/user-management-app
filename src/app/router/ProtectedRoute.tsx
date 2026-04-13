import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loader from "../../shared/components/ui/Loader";
import { ROUTES } from "../constants/routes";

export default function ProtectedRoute({ children }: any) {
    const { user, loading } = useAuth();

    if (loading) return <Loader />;

    if (!user) return <Navigate to={ROUTES.LOGIN} replace />;

    return children;
}