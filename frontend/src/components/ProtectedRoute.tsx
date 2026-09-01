import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-xs font-medium text-gray-500">
        Loading...
      </div>
    );
  }

 
  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};
