import React from 'react';
import {Route, Routes} from "react-router-dom";

import './App.css';
import LoginPage from "./features/auth/LoginPage";
import RegistrationPage from "./features/auth/RegistrationPage";
import RequireAuth from "./features/auth/RequireAuth";
import MainPage from "./features/main/MainPage";


function App() {
  return (
      <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration" element={<RegistrationPage />} />

          <Route element={<RequireAuth />}>
              <Route index element={<MainPage />} />
          </Route>
      </Routes>
  );
}

export default App;
