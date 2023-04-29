import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { getUserData, verifyOtp } from "../../services/auth.services";
import {
  getAccessTokenFromStorage,
  saveAccessTokenToStorage,
} from "../../utils/storage.utils";
import { useNavigate } from "react-router-dom";

const authContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [authData, setAuthData] = useState({
    isAuthenticated: false,
    userData: null,
  });

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const accessToken = getAccessTokenFromStorage();

      if (!accessToken) return setIsAuthLoading(false);

      const { data, error } = await getUserData();

      if (!!error) return console.log(error);

      setAuthData({ isAuthenticated: true, userData: data.data.user });

      setIsAuthLoading(false);
    })();
  }, []);

  const handleVerifyOtp = useCallback(async (otp, otp_uuid) => {
    setIsAuthLoading(true);

    const { data, error } = await verifyOtp({ otp, otp_uuid });

    if (!!error) return setIsAuthLoading(false);

    const user = data.data.user;

    saveAccessTokenToStorage(data.data.accessToken);

    setAuthData({
      isAuthenticated: true,
      userData: user,
    });

    setIsAuthLoading(false);

    const eventId = localStorage.getItem("event_id");

    if (!!eventId) navigate(`/confirm/${eventId}`);
  }, []);

  return (
    <authContext.Provider
      value={{ isAuthLoading, authData, verifyOtp: handleVerifyOtp }}
    >
      {children}
    </authContext.Provider>
  );
};

export const useAuthContext = () => {
  const data = useContext(authContext);

  return data;
};

export default AuthProvider;
