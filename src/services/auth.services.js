import { getRequest, postRequest } from "../utils/request.utils";
import { GET_AUTH_DATA, LOGIN_URL, SIGNUP_URL } from "../utils/url.utils";

export const login = (data) => {
    return postRequest({
        url: LOGIN_URL,
        data,
    });
};

export const register = (data) => {
    return postRequest({
        url: SIGNUP_URL,
        data,
    });
};

export const getAuth = () => {
    return getRequest({
        url: GET_AUTH_DATA,
        noAuth: true,
    });
};
