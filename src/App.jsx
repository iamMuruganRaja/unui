import React from "react";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./components/contexts/AuthContext";
import MainRouter from "./pages";

const App = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <MainRouter />
            </AuthProvider>
        </BrowserRouter>
    );
};

export default App;
