import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

//   console.log(isAuthenticated, "is");

  if (isAuthenticated) {
    return <Outlet />;
  }

  return <Navigate to="/" />;
};

export default ProtectedRoute;
