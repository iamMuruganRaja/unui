import { useEffect, useState } from "react";

import classes from "./SplashScreen.module.css";

const SPLASH_DURATION = process.env.REACT_SPLASH_DURATION || 6000;

const SplashScreen = ({ children }) => {
  const [isSplashShown, setIsSplashShown] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsSplashShown(true), SPLASH_DURATION);
  }, []);

  return (
    <div className={classes.main_container}>{isSplashShown && children}</div>
  );
};

export default SplashScreen;
