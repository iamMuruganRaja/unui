import React from "react";

import SplashScreen from "../../components/splash/SplashScreen";

import splashBg from "../../assets/splash_bg.png";

import classes from "./UpcomingPage.module.css";

const UpcomingPage = () => {
  return (
    <SplashScreen>
      <div className={classes.main_container}>
        <img src={splashBg} className={classes.top_hero} />
      </div>
    </SplashScreen>
  );
};

export default UpcomingPage;
