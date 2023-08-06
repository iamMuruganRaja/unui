import { createContext, useContext, useState } from "react";

const splashContext = createContext();

const SplashContextProvider = ({ children }) => {
  const [isSplashDisabled, setIsSplashDisabled] = useState(false);

  return (
    <splashContext.Provider value={[isSplashDisabled, setIsSplashDisabled]}>
      {children}
    </splashContext.Provider>
  );
};

const useSplashContext = () => {
  const splashData = useContext(splashContext);

  return splashData;
};

export { useSplashContext };

export default SplashContextProvider;
