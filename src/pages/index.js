import React, { useEffect } from "react";
import { Navigate, Route, Routes, useSearchParams } from "react-router-dom";
import HomePage from "./home/HomePage";
import RegisterPage from "./register/RegisterPage";
import SupportPage from "./support/SupportPage";
import ConfirmationPage from "./confirmation/ConfirmationPage";
import ExplorePage from "./explore/ExplorePage";
import UpcomingPage from "./upcoming/UpcomingPage";
import { useAuthContext } from "../components/contexts/AuthContext";
import NavbarComponent from "../components/navbar/NavbarComponent";
import LoadingComponent from "../components/loading/LoadingComponent";

function MainRouter() {
  const { authData, isAuthLoading } = useAuthContext();

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const eventId = searchParams.get("event_id");

    if (!eventId) return;

    localStorage.setItem("event_id", eventId);
  }, [searchParams]);

  return (
    <>
      <NavbarComponent />
      {isAuthLoading ? (
        <LoadingComponent />
      ) : (
        <>
          {authData.isAuthenticated ? (
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/support" element={<SupportPage />} />
              <Route path="/explore" element={<ExplorePage />} />
              <Route path="/upcoming" element={<UpcomingPage />} />
              <Route path="/confirm/:eventId" element={<ConfirmationPage />} />
              <Route path="*" element={<Navigate to="/" replace={true} />} />
            </Routes>
          ) : (
            <Routes>
              <Route path="/register" element={<RegisterPage />} />
              <Route
                path="*"
                element={<Navigate to="/register" replace={true} />}
              />
            </Routes>
          )}
        </>
      )}
    </>
  );
}

export default MainRouter;
