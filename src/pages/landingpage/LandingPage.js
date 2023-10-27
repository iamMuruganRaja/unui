import React from "react";
import Header from "../landingpage/Header";
import AboutUs from "../landingpage/AboutUs";
import OurMission from "../landingpage/OurMission";
import OurJourney from "../landingpage/OurJourney";
import GetInvolved from "../landingpage/GetInvolved";
import SocialFollow from "../landingpage/SocialFollow";
import Footer from "../landingpage/Footer";
// import Header from "../../components/topbar/Headers";

const LandingPage = () => {
  return (
    <div className="LandingPage">
      {/* <Header / */}
      <div className="container" id="content">
        <AboutUs />
        <OurMission />
        <OurJourney />
        <GetInvolved />

        {/* Add more sections as needed */}
      </div>
      <SocialFollow />
      <Footer />
    </div>
  );
};

export default LandingPage;
