import { useEffect, useState } from "react";

import classes from "./SplashScreen.module.css";

const SPLASH_DURATION = process.env.REACT_SPLASH_DURATION || 6000;

const SplashScreen = ({ children }) => {
  const [isSplashShown, setIsSplashShown] = useState(false);

  useEffect(() => {
    setTimeout(
      () => {
        localStorage.setItem("isSplashShown", true);
        setIsSplashShown(true);
      },
      localStorage.getItem("isSplashShown") === "true" ? 0 : SPLASH_DURATION
    );

    console.log(localStorage.getItem("isSplashShown"));
  }, []);

  return (
    <div className={classes.main_container}>{isSplashShown && children}</div>
  );
};

export default SplashScreen;
