import { getRequest, postRequest } from "../utils/request.utils";
import {
  GET_ALL_EVENTS,
  GET_EVENT_URL,
  REGISTER_EVENT,
} from "../utils/url.utils";

export const getEvents = () => {
  return getRequest({
    url: GET_ALL_EVENTS,
  });
};

export const getEvent = (eventId) => {
  return getRequest({
    url: GET_EVENT_URL.replace("$ID", eventId),
  });
};

export const registerForEvent = (data) => {
  return postRequest({
    url: REGISTER_EVENT,
    data: { data },
  });
};
