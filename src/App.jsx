import React from "react";
import { BrowserRouter } from "react-router-dom";

import AuthProvider from "./components/contexts/AuthContext";
import MainRouter from "./pages";
import { ToastContainer } from "react-toastify";
import SplashContextProvider from "./components/contexts/SplashContext";

import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SplashContextProvider>
          <MainRouter />
        </SplashContextProvider>
      </AuthProvider>
      <ToastContainer position="bottom-center" />
    </BrowserRouter>
  );
};

export default App;
