import { putRequest } from "../utils/request.utils";
import { UPDATE_USER_PROFILE } from "../utils/url.utils";

export const updateProfile = (data) => {
  return putRequest({
    url: UPDATE_USER_PROFILE,
    data: { data },
  });
};
