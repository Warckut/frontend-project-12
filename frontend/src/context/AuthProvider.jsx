import React, { useState, useMemo } from 'react';
import AuthContext from './index';

const AuthProvider = ({ children }) => {
  const userDataStr = localStorage.getItem('userData');
  const userData = (userDataStr) ? JSON.parse(userDataStr) : null;
  const [loggedIn, setLoggedIn] = useState(!!userData);
  const [user, setUser] = useState(userData);

  const logIn = ({ username }) => {
    setLoggedIn(true);
    setUser({ username });
  };
  const logOut = () => {
    localStorage.removeItem('userData');
    setLoggedIn(false);
    setUser(null);
  };

  const memoCallback = useMemo((() => ({
    user,
    loggedIn,
    logIn,
    logOut,
  })), [loggedIn, user]);

  return (
    <AuthContext.Provider value={memoCallback}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
