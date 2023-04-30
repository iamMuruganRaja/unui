import { deleteRequest, getRequest, postRequest } from "../utils/request.utils";
import {
  GET_USER_DATA,
  LOGOUT_URL,
  REGISTER_URL,
  VERIFY_OTP_URL,
} from "../utils/url.utils";

export const loginorsignup = (data) => {
  return postRequest({
    url: REGISTER_URL,
    data: { data },
  });
};

export const verifyOtp = (data) => {
  return postRequest({
    url: VERIFY_OTP_URL,
    data: { data },
  });
};

export const logout = () => {
  return deleteRequest({
    url: LOGOUT_URL,
  });
};

export const getUserData = () => {
  return getRequest({
    url: GET_USER_DATA,
  });
};
