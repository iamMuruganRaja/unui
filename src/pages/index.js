import React from "react";
import { Route, Routes } from "react-router-dom";

function MainRouter() {
    //    const { authData, isAuthLoading } = useAuthContext();

    return (
        <>
            <Routes>
                <Route />
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
