import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { getUserRole } from '../utils/auth';

const PrivateRoute = ({ allowedRoles }) => {
  const location = useLocation();
  const role = getUserRole();

  if (!role) {
    localStorage.removeItem("token");
    localStorage.removeItem("nome_usuario");
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    localStorage.removeItem("token");
    localStorage.removeItem("nome_usuario");
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;