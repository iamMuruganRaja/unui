import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./home/HomePage";
import RegisterPage from "./register/RegisterPage";
import SupportPage from "./support/SupportPage";
import ConfirmationPage from "./confirmation/ConfirmationPage";
import ExplorePage from "./explore/ExplorePage";

function MainRouter() {
  //    const { authData, isAuthLoading } = useAuthContext();

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/explore" element={<ExplorePage />} />
      </Routes>
    </>
  );

  /*
    return (
        <>
            <NavbarComponent />
            {isAuthLoading ? (
                <LoadingComponent />
            ) : (
                <>
                    {authData.isAuthenticated ? (
                        <Routes>
                            <Route
                                path="/dashboard"
                                element={<DashboardPage />}
                            />
                            <Route
                                path="/admin"
                                element={<AdminDashboardPage />}
                            />
                            <Route
                                path="*"
                                element={
                                    <Navigate to="/dashboard" replace={true} />
                                }
                            />
                        </Routes>
                    ) : (
                        <Routes>
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/register" element={<SignupPage />} />
                            <Route
                                path="*"
                                element={
                                    <Navigate to="/login" replace={true} />
                                }
                            />
                        </Routes>
                    )}
                </>
            )}
        </>
    );
    */
}

export default MainRouter;
