import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from '../hooks';

const PrivateRoute = ({ children }) => {
  const { loggedIn } = useAuth();
  const location = useLocation();
  if (!loggedIn) return <Navigate to="/login" state={{ from: location }} />;

  return children;
};

export default PrivateRoute;
