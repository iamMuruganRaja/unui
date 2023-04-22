import React from "react";
import { BrowserRouter } from "react-router-dom";
import MainRouter from "./pages";
import SplashScreen from "./components/splash/SplashScreen";

const App = () => {
    return (
        <BrowserRouter>
            <SplashScreen>
                {/*<AuthProvider>*/}
                <MainRouter />
                {/*</AuthProvider>*/}
            </SplashScreen>
        </BrowserRouter>
    );
};

export default App;
