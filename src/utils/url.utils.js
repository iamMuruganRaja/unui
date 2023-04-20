const BASE_URL = process.env.REACT_API_URL || "http://localhost:8000";

// AUTH

const BASE_AUTH_URL = `${BASE_URL}/auth`;

export const LOGIN_URL = `${BASE_AUTH_URL}/login`;

export const SIGNUP_URL = `${BASE_AUTH_URL}/register`;

export const GET_AUTH_DATA = `${BASE_AUTH_URL}`;
