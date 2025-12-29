import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const RoleBasedRoute = ({ children, allowedRoles }) => {
  const { user } = useSelector((state) => state.profile);

  // If user not loaded yet, show loading
  if (!user) {
    return <div className="flex justify-center items-center min-h-screen">
      <div className="spinner"></div>
    </div>;
  }

  // Check if user's role is allowed
  if (!allowedRoles.includes(user?.accountType)) {
    // Redirect unauthorized users to their profile
    return <Navigate to="/dashboard/my-profile" replace />;
  }

  return children;
};

export default RoleBasedRoute;