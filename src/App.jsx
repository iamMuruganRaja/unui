import React from "react";
import { BrowserRouter } from "react-router-dom";

import AuthProvider from "./components/contexts/AuthContext";
import MainRouter from "./pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <MainRouter />
      </AuthProvider>
      <ToastContainer position="bottom-center" />
    </BrowserRouter>
  );
};

export default App;
