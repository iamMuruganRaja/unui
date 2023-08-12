import { getRequest, postRequest, putRequest } from "../utils/request.utils";
import {
  GET_ALL_EVENTS,
  GET_ALL_EVENT_CLIPS,
  GET_EVENT_URL,
  REGISTER_EVENT,
  GET_MY_EVENTS,
  UPDATE_PARTICIPANT_INFO,
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

export const getAllEventClips = () => {
  return getRequest({
    url: GET_ALL_EVENT_CLIPS,
  });
};

export const getMyEvents = () => {
  return getRequest({
    url: GET_MY_EVENTS,
  });
};

export const updateParticipantInfo = (data) => {
  return putRequest({
    url: UPDATE_PARTICIPANT_INFO,
    data: { data },
  });
};
