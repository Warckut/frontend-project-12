import { BrowserRouter, Routes, Route } from 'react-router-dom';

import React from 'react';
import Login from '../pages/Login';
import NoMatch from '../pages/NoMatch';

const App = () => (
  <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="" />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </BrowserRouter>
  </div>
);

export default App;
