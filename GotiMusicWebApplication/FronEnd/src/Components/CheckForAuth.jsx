import { useNavigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
const ProtectedRoute = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }
        try {
            const decoded = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            
            if (decoded.exp < currentTime) {
                localStorage.removeItem('token');
                navigate('/login');
            }
        } catch (error) {
            localStorage.removeItem('token');
            navigate('/login');
        }
    }, [token, navigate]);

    return token ? <Outlet /> : null;
};
export default ProtectedRoute;