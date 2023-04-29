import { getRequest, postRequest } from "../utils/request.utils";
import {
  GET_USER_DATA,
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

export const getUserData = () => {
  return getRequest({
    url: GET_USER_DATA,
    noAuth: true,
  });
};
