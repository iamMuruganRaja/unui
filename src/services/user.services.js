import { getRequest, putRequest } from "../utils/request.utils";
import { GET_REGISTERED_EVENTS, UPDATE_USER_PROFILE } from "../utils/url.utils";

export const updateProfile = (data) => {
  return putRequest({
    url: UPDATE_USER_PROFILE,
    data: { data },
  });
};

export const getRegisteredEvents = () => {
  return getRequest({
    url: GET_REGISTERED_EVENTS,
  });
};
