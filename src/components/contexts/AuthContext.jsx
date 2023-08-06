import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { getUserData, verifyOtp } from "../../services/auth.services";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { updateProfile } from "../../services/user.services";

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
      const { data, error } = await getUserData();

      setIsAuthLoading(false);

      if (!!error) return console.log(error);

      setAuthData({
        isAuthenticated: true,
        userData: { ...data.data.profile_info, ...data.data },
      });
    })();
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      await updateProfile({
        last_connected_at: Date.now(),
      });
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const isUserDataFilled = (userData) => {
    if (!userData.first_name) return false;
    if (!userData.social_media_link) return false;
    if (!userData.role) return false;

    return true;
  };

  const updateUserData = useCallback(async () => {
    setIsAuthLoading(true);

    const { data, error } = await getUserData();

    setIsAuthLoading(false);

    if (!!error) return console.log(error);

    setAuthData({
      isAuthenticated: true,
      userData: { ...data.data.profile_info, ...data.data },
    });
  }, []);

  const handleVerifyOtp = useCallback(async (otp, otp_uuid) => {
    setIsAuthLoading(true);

    const { data, error } = await verifyOtp({ otp, otp_uuid });

    if (!!error) {
      return setIsAuthLoading(false);
    }

    if (data.status === false) {
      toast.error(data.errors[0]);
      return setIsAuthLoading(false);
    }

    const user = { ...data.data.profile_info, ...data.data };

    setAuthData({
      isAuthenticated: true,
      userData: user,
    });

    setIsAuthLoading(false);

    const eventId = localStorage.getItem("event_id");

    if (!isUserDataFilled(user)) return navigate("/edit-profile");

    if (!!eventId) return navigate(`/event?event_id=${eventId}`);

    return navigate("/");

    // eslint-disable-next-line
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
