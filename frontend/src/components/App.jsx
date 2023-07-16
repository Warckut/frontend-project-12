import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import routes from '../routes';
import AuthProvider from '../context/AuthProvider';
import Login from './pages/Login';
import NoMatch from './pages/NoMatch';
import Chat from './pages/Chat';
import SignUp from './pages/SignUp';
import PrivateRoute from './PrivateRoute';
import Nav from './Nav';

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <div className="d-flex flex-column h-100">
        <Nav />
        <Routes>
          <Route
            path=""
            element={(
              <PrivateRoute redirectTo={routes.loginPagePath()}>
                <Chat />
              </PrivateRoute>
            )}
          />
          <Route path={routes.loginPagePath()} element={<Login />} />
          <Route path={routes.signUpPagePath()} element={<SignUp />} />
          <Route path="*" element={<NoMatch />} />
          <Route path="*/*" element={<NoMatch />} />
        </Routes>
        <ToastContainer />
      </div>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
