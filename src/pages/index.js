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
import EditProfilePage from "./edit-profile/EditProfile";
import ParticipantsPage from "./participants/ParticipantsPage";
import SchedulePage from "./schedule/SchedulePage";

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
          <Routes>
            {authData.isAuthenticated ? (
              <>
                <Route path="/support" element={<SupportPage />} />
                <Route path="/edit-profile" element={<EditProfilePage />} />
                <Route path="/details/:eventId" element={<ExplorePage />} />
                <Route
                  path="/participants/:eventId"
                  element={<ParticipantsPage />}
                />
                <Route path="/schedule/:eventId" element={<SchedulePage />} />
                <Route path="/event" element={<ConfirmationPage />} />
                <Route path="*" element={<Navigate to="/" replace={true} />} />
              </>
            ) : (
              <>
                <Route path="/register" element={<RegisterPage />} />
                <Route
                  path="*"
                  element={<Navigate to="/register" replace={true} />}
                />
              </>
            )}
            <Route path="/" element={<UpcomingPage />} />
          </Routes>
        </>
      )}
    </>
  );
}

export default MainRouter;
