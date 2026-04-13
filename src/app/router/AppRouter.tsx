import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Loader from "../../shared/components/ui/Loader";
import ProtectedRoute from "./ProtectedRoute";
import { ROUTES } from "../constants/routes";
import MainLayout from "../layouts/MainLayout";

const UsersList = lazy(() => import("../../features/users/pages/UsersList"));
const Login = lazy(() => import("../../features/auth/pages/Login"));
const Signup = lazy(() => import("../../features/auth/pages/Signup"));
const MapPage = lazy(() => import("../../features/map/pages/MapPage"));

export default function AppRouter() {
    return (
        <MainLayout>
            <Suspense fallback={<Loader />}>
                <Routes>
                    <Route path={ROUTES.LOGIN} element={<Login />} />
                    <Route path={ROUTES.SIGNUP} element={<Signup />} />

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

                    <Route path="*" element={<Navigate to={ROUTES.LOGIN} />} />
                </Routes>
            </Suspense>
        </MainLayout>
    );
}