import { useEffect, useState } from "react";

import classes from "./SplashScreen.module.css";
import splash from "../../assets/splash.gif";

const SPLASH_DURATION = process.env.REACT_SPLASH_DURATION || 6000;

const SplashScreen = ({ children }) => {
  const [seed] = useState(() => Math.random());
  const [isSplashShown, setIsSplashShown] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsSplashShown(true), SPLASH_DURATION);
  }, []);

  return (
    <div className={classes.main_container}>
      <img src={`${splash}?${seed}`} className={classes.gif} />
      {isSplashShown && children}
    </div>
  );
};

export default SplashScreen;
