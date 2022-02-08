import { useLocation, Navigate } from "react-router-dom";

export default function AuthGuard({ children }) {
    const isAuth = localStorage.getItem('token');
    let location = useLocation();

    if (!isAuth) {
        return <Navigate to="/home" state={{ from: location }} />;
    }

    return children;
}