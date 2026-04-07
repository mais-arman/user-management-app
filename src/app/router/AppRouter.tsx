import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Loader from "../../shared/components/Loader";
import Navbar from "../../shared/components/Navbar";
import ProtectedRoute from "./ProtectedRoute";
import { useAuth } from "../context/AuthContext";
import { ROUTES } from "../constants/routes";

const UsersList = lazy(() => import("../../features/users/pages/UsersList"));
const Login = lazy(() => import("../../features/auth/pages/Login"));
const Signup = lazy(() => import("../../features/auth/pages/Signup"));
const MapPage = lazy(() => import("../../features/map/pages/MapPage"));

export default function AppRouter() {
    const { user, loading } = useAuth();

    if (loading) return <Loader />;

    return (
        <Suspense fallback={<Loader />}>
        {user && <Navbar />}

        <Routes>
            {!user && (
            <>
                <Route path={ROUTES.LOGIN} element={<Login />} />
                <Route path={ROUTES.SIGNUP} element={<Signup />} />
            </>
            )}

            <Route
            path={ROUTES.USERS}
            element={
                <ProtectedRoute>
                <UsersList />
                </ProtectedRoute>
            }
            />

            <Route
            path={ROUTES.MAP}
            element={
                <ProtectedRoute>
                <MapPage />
                </ProtectedRoute>
            }
            />

            <Route path="*" element={<Navigate to={user ? ROUTES.USERS : ROUTES.LOGIN} />} />
        </Routes>
        </Suspense>
    );
}