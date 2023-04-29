import { getRequest } from "../utils/request.utils";
import { GET_ALL_EVENTS, GET_EVENT_URL } from "../utils/url.utils";

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
