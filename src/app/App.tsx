import QueryProvider from "./providers/QueryProvider";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router/AppRouter";
import AuthProvider from "./context/AuthContext";

export default function App() {
    return (
        <QueryProvider>
        <AuthProvider>
            <BrowserRouter>
            <AppRouter />
            </BrowserRouter>
        </AuthProvider>
        </QueryProvider>
    );
}