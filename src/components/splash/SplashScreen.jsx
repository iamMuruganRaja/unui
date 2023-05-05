import { useEffect, useState } from "react";

import classes from "./SplashScreen.module.css";

const SPLASH_DURATION = process.env.REACT_SPLASH_DURATION || 5000;

const SplashScreen = ({ children }) => {
  const [isSplashShown, setIsSplashShown] = useState(false);
  const [random] = useState(() => Math.random());

  useEffect(() => {
    setTimeout(() => {
      setIsSplashShown(true);
    }, SPLASH_DURATION);
  }, []);

  return (
    <div
      className={classes.main_container}
      style={{
        backgroundImage: `url(${window.location.origin}/splash.gif?seed=${random})`,
      }}
    >
      {isSplashShown && children}
    </div>
  );
};

export default SplashScreen;
