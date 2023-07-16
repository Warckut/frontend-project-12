import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from '../hooks';

const PrivateRoute = ({ children, redirectTo }) => {
  const { loggedIn } = useAuth();
  const location = useLocation();

  if (!loggedIn) return <Navigate to={redirectTo} state={{ from: location }} />;

  return children;
};

export default PrivateRoute;
