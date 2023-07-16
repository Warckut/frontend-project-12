import React, { useState, useMemo } from 'react';
import { AuthContext } from '.';
import { saveUserData, removeUserData, getUserData } from './authApi';

const AuthProvider = ({ children }) => {
  const userData = getUserData();
  const [loggedIn, setLoggedIn] = useState(!!userData);
  const [user, setUser] = useState(userData);

  const logIn = ({ token, username }) => {
    console.log(token);
    console.log(username);
    saveUserData({ token, username });
    setLoggedIn(true);
    setUser({ username });
  };

  const logOut = () => {
    removeUserData();
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
