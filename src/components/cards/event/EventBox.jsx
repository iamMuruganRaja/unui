import participants from "../../assets/card-icon.png";

const EventBox = ({ event }) => {
  return (
    <div className={classes.carousel_card_item}>
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
          {event.event_participants.length > 1 && (
            <img
              alt="icon"
              className={classes.participant_icon}
              src={participants}
              style={{ left: -5 }}
            />
          )}
          {event.event_participants.length > 2 && (
            <img
              alt="icon"
              className={classes.participant_icon}
              src={participants}
              style={{ left: -10 }}
            />
          )}
          {event.event_participants.length > 3 && (
            <img
              alt="icon"
              className={classes.participant_icon}
              src={participants}
              style={{ left: -15 }}
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
          {dayjs(event.start_time).format("DD MMM")}
        </div>
      </div>
      <div className={classes.bottom_row}>
        <div className={classes.left_container}>
          <h3 className={classes.name_container}>{event.name}</h3>
          <h4 className={classes.host_container}>Host: John Doe</h4>
        </div>
        <Link
          to={`/event?event_id=${event.uuid}`}
          className={classes.register_button}
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default EventBox;
