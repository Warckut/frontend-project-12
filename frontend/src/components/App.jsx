import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';

import React, { useMemo, useState, useEffect } from 'react';
import AuthContext from '../context';
import useAuth from '../hooks';

import Login from '../pages/Login';
import NoMatch from '../pages/NoMatch';
import Chat from '../pages/Chat';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) logIn();
  }, []);

  const memoCallback = useMemo((() => ({ loggedIn, logIn, logOut })), [loggedIn]);

  return (
    <AuthContext.Provider value={memoCallback}>
      {children}
    </AuthContext.Provider>
  );
};

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  return (
    auth.loggedIn ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route
          path=""
          element={(
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          )}
        />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
