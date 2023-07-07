const BASE_URL =
  // "https://api.unmutex.in";
  "https://19296028-bd19-458b-95f4-a715f739ba4a.mock.pstmn.io";

// AUTH

export const REGISTER_URL = `${BASE_URL}/signup_or_login`;

export const LOGOUT_URL = `${BASE_URL}/logout`;

export const VERIFY_OTP_URL = `${BASE_URL}/verify_otp`;

export const GET_USER_DATA = `${BASE_URL}/user`;

export const REGISTER_EVENT = `${BASE_URL}/event_participants`;

export const GET_EVENT_URL = `${BASE_URL}/events/$ID`;

export const GET_ALL_EVENTS = `${BASE_URL}/events`;

export const UPDATE_USER_PROFILE = `${BASE_URL}/user_profiles/update`;
