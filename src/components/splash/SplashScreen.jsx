import { useEffect, useState } from "react";

import classes from "./SplashScreen.module.css";
import { useSplashContext } from "../contexts/SplashContext";

const SPLASH_DURATION = process.env.REACT_SPLASH_DURATION || 5000;

const SplashScreen = ({ children }) => {
  const [isSplashDisabled, setIsSplashDisabled] = useSplashContext(false);
  const [isSplashShown, setIsSplashShown] = useState(false);
  const [random] = useState(() => Math.random());

  useEffect(() => {
    setTimeout(() => {
      setIsSplashShown(true);
      setIsSplashDisabled(true);
    }, SPLASH_DURATION);
  }, []);

  return (
    <div
      className={classes.main_container}
      style={{
        backgroundImage: !isSplashDisabled
          ? undefined
          : undefined,
      }}
    >
      {(isSplashShown || isSplashDisabled) && children}
    </div>
  );
};

export default SplashScreen;
