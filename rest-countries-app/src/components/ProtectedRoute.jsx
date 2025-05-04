import { Navigate, useLocation } from "react-router-dom";

// Protected route component that checks if user is authenticated
// If not authenticated, redirects to login page with return URL
const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem("token") !== null;
  
  if (!isAuthenticated) {
    // Save the current path to redirect back after login
    return (
      <Navigate 
        to="/login" 
        state={{ from: location.pathname }}
        replace 
      />
    );
  }

  return children;
};

export default ProtectedRoute;