import { Navigate } from "react-router-dom";

import { useSelector } from "react-redux";

function ProtectedRoute({

  children,
  allowedRoles,

}) {

  const { user } = useSelector(
    (state) => state.auth
  );

  // Not logged in
  if (!user) {

    return <Navigate to="/" />;
  }

  // Role not allowed
  if (!allowedRoles.includes(user.role)) {

    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;