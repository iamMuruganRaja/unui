import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";
import { getAuth, login, register } from "../../services/auth.services";
import {
    getAccessTokenFromStorage,
    saveAccessTokenToStorage,
} from "../../utils/storage.utils";

const authContext = createContext();

const AuthProvider = ({ children }) => {
    const [isAuthLoading, setIsAuthLoading] = useState(true);
    const [authData, setAuthData] = useState({
        isAuthenticated: false,
        userData: null,
    });

    useEffect(() => {
        (async () => {
            const accessToken = getAccessTokenFromStorage();

            if (!accessToken) return setIsAuthLoading(false);

            const { data, error } = await getAuth();

            if (!!error) return console.log(error);

            setAuthData({ isAuthenticated: true, userData: data.data.user });

            setIsAuthLoading(false);
        })();
    }, []);

    const handleLogin = useCallback(async (username, password) => {
        setIsAuthLoading(true);

        const { data, error } = await login({ username, password });

        if (!!error) return setIsAuthLoading(false);

        const user = data.data.user;

        saveAccessTokenToStorage(data.data.accessToken);

        setAuthData({
            isAuthenticated: true,
            userData: user,
        });

        setIsAuthLoading(false);
    }, []);

    const handleSignup = useCallback(async (username, password, fullName) => {
        setIsAuthLoading(true);

        const { data, error } = await register({ username, password, fullName });

        if (!!error) return setIsAuthLoading(false);

        const user = data.data.user;

        saveAccessTokenToStorage(data.data.accessToken);

        setAuthData({
            isAuthenticated: true,
            userData: user,
        });

        setIsAuthLoading(false);
    }, []);

    return (
        <authContext.Provider
            value={{ isAuthLoading, authData, handleLogin, handleSignup }}
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
