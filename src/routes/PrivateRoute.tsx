import React from 'react';
import { Navigate, Outlet } from 'react-router';

interface PrivateRouteProps {
  isAuthenticated: boolean; // Propiedad para verificar la autenticación
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ isAuthenticated }) => {
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
