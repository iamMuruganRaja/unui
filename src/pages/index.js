import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import NavbarComponent from "../components/navbar/NavbarComponent";
import LoginPage from "./login/LoginPage";
import { useAuthContext } from "../components/contexts/AuthContext";
import SignupPage from "./signup/SignupPage";
import DashboardPage from "./dashboard/DashboardPage";
import LoadingComponent from "../components/loading/LoadingComponent";
import AdminDashboardPage from "./admin-dashboard/AdminDashboardPage";

function MainRouter() {
    const { authData, isAuthLoading } = useAuthContext();

    return (
        <>
            
        </>
    )

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
}

export default MainRouter;
