import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/helpers/auth.context'; 
const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;