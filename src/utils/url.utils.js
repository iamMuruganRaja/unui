const BASE_URL =
  // "https://0936-13-235-238-250.ngrok-free.app";
  // "https://4ea0-103-105-226-2.ngrok-free.app";
  // "http://localhost:3000";
  "https://api.unmutex.in";

// AUTH

export const REGISTER_URL = `${BASE_URL}/signup_or_login`;

export const LOGOUT_URL = `${BASE_URL}/logout`;

export const VERIFY_OTP_URL = `${BASE_URL}/verify_otp`;

export const GET_USER_DATA = `${BASE_URL}/user`;

export const REGISTER_EVENT = `${BASE_URL}/event_participants`;

export const GET_REGISTERED_EVENTS = `${BASE_URL}/registered_events`;

export const GET_EVENT_URL = `${BASE_URL}/events/$ID`;

export const CREATE_EVENT_URL = `${BASE_URL}/events/`;

export const EVENT_COMMUNICATION_URL = `${BASE_URL}/events/$ID/send_communication`;

export const GET_ALL_EVENTS = `${BASE_URL}/events?type=upcoming`;

export const GET_MY_EVENTS = `${BASE_URL}/events?type=my_events`;

export const GET_ALL_EVENT_CLIPS = `${BASE_URL}/event_clips`;

export const UPDATE_USER_PROFILE = `${BASE_URL}/user_profiles/update`;

export const UPDATE_PARTICIPANT_INFO = `${BASE_URL}/event_participants/host_mode`;
