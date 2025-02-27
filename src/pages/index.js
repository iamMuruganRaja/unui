import React, { useEffect } from "react";
import { Navigate, Route, Routes, useSearchParams } from "react-router-dom";
import RegisterPage from "./register/RegisterPage";
import SupportPage from "./support/SupportPage";
import ConfirmationPage from "./confirmation/ConfirmationPage";
import ExplorePage from "./explore/ExplorePage";
import UpcomingPage from "./upcoming/UpcomingPage";
import { useAuthContext } from "../components/contexts/AuthContext";
import LoadingComponent from "../components/loading/LoadingComponent";
import EditProfilePage from "./edit-profile/EditProfile";
import EventForm from "./event-form/EventForm";
import ParticipantsPage from "./participants/ParticipantsPage";
import SchedulePage from "./schedule/SchedulePage";
import TopNav from "../components/topbar/Headers";
import BottomNav from "../components/navbar/BottomNav";
import HomePage from "./home/HomePage";
import ProfilePage from "./profile/ProfilePage";
import MyEventsPage from "./my-events/MyEventsPage";
import Aboutus from "./aboutus/AboutUs";
import LandingPage from "./landingpage/LandingPage";
import DetailsPage from "./event-details/DetailsPage";

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
      {/* <TopNav /> */}
      {isAuthLoading ? (
        <LoadingComponent />
      ) : (
        <>
          <Routes>
            {authData.isAuthenticated ? (
              <>
                <Route path="/" element={<UpcomingPage />} />
                <Route path="/landing" element={<LandingPage />} />
                <Route path="/upcoming" element={<UpcomingPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/participant-profile" element={<ProfilePage />} />
                <Route path="/my-events" element={<MyEventsPage />} />
                <Route path="/support" element={<SupportPage />} />
                <Route path="/about-us" element={<LandingPage />} />
                <Route path="/landing-page" element={<LandingPage />} />

                <Route path="/complete-profile" element={<EditProfilePage />} />
                <Route path="/edit-profile" element={<EditProfilePage />} />
                <Route path="/events" element={<EventForm />} />
                <Route path="/details/:eventId" element={<DetailsPage />} />
                <Route
                  path="/event-details/:eventId"
                  element={<DetailsPage />}
                />
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
                <Route path="/upcoming" element={<UpcomingPage />} />
                <Route
                  path="/event-details/:eventId"
                  element={<DetailsPage />}
                />
                <Route
                  path="*"
                  element={<Navigate to="/register" replace={true} />}
                />
              </>
            )}
            <Route path="/" element={<UpcomingPage />} />
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/upcoming" element={<UpcomingPage />} />
            <Route path="/about-us" element={<LandingPage />} />
          </Routes>
        </>
      )}
      <BottomNav />
    </>
  );
}

export default MainRouter;
