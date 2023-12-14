import participants from "../../../assets/card-icon.png";
import dayjs from "dayjs";

import classes from "./EventBox.module.css";
import { Link } from "react-router-dom";
import {TIMZONE_OFFSET_IN_MINS_INDIA} from "../../../config/constants";


const EventBox = ({ event }) => {
  const getAsset = (event, asset_key) => {
    return event.event_assets.filter((asset) => asset_key === asset.key)[0];
  };
  const getHost = (event) => {
    return event.event_participants.filter((part) => part.role === "Host")[0];
  };

  return (
    <div
      className={classes.carousel_card_item}
      style={{
        backgroundImage: `url(${
          getAsset(event, "background")?.value.link ||
          "https://i.ibb.co/HtRrwPV/bg.png"
        })`,
      }}
    >
      <div className={classes.top_row}>
        <div className={classes.participants}>
          {event.event_participants.length > 0 && (
            <img
              alt="icon"
              className={classes.participant_icon}
              src={participants}
              style={{ left: 0 }}
            />
          )}
          <p
            className={classes.participant_count}
            style={{
              left: 10 - 5 * (event.event_participants.length % 4),
            }}
          >
            {event.event_participants.length} Participants
          </p>
        </div>
        <div className={classes.date_box}>
          {dayjs(event.start_time).add(TIMZONE_OFFSET_IN_MINS_INDIA, "minute").format("DD MMM")}
        </div>
      </div>
      <div className={classes.bottom_row}>
        <div className={classes.left_container}>
          <h3 className={classes.name_container}>
            {event.name.substring(0, 10)}
          </h3>
          <h4 className={classes.host_container}>Host: {getHost(event)?.profile_info?.first_name}</h4>
        </div>
        <Link to={`/details/${event.uuid}`} className={classes.register_button}>
          Details
        </Link>
      </div>
    </div>
  );
};

export default EventBox;
