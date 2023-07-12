import React, { useEffect, useState } from "react";

import heroImg from "../../assets/details-hero.png";
import editIcon from "../../assets/edit-icon.svg";
import reorderIcon from "../../assets/reorder-icon.svg";

import classes from "./SchedulePage.module.css";
import { Link, useParams } from "react-router-dom";
import { getEvent } from "../../services/events.services";
import dayjs from "dayjs";
import LoadingComponent from "../../components/loading/LoadingComponent";
import ScheduleDropdown from "../../components/dropdown/ScheduleDropdown";
import { ReactSortable } from "react-sortablejs";

function SchedulePage() {
  const { eventId } = useParams();

  const [eventDetails, setEventDetails] = useState(null);
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    (async () => {
      const { data, error } = await getEvent(eventId);

      if (!!error) return;

      setEventDetails(data.data);
      setSchedule([
        ...data.data.event_participants,
        ...data.data.event_participants,
        ...data.data.event_participants,
      ]);
    })();
  }, [eventId]);

  if (!eventDetails) return <LoadingComponent />;

  return (
    <div className={classes.main_container}>
      <img alt="hero" src={heroImg} className={classes.hero_img} />

      <div className={classes.schedule_header}>
        <div>
          <h2 className={classes.schedule_title}>Today's Schedule</h2>
          <h6 className={classes.schedule_date}>
            {dayjs().format("dddd, D MMMM")}
          </h6>
        </div>
        <img src={editIcon} />
      </div>
      <div className={classes.schedule_list}>
        <ReactSortable
          list={schedule}
          setList={setSchedule}
          handle={classes.handle_img}
        >
          {schedule.map((item, ind) => (
            <div key={item.id} className={classes.list_item}>
              <ScheduleDropdown
                selectedValue="Present"
                range={`10:00AM-11:00AM`}
                event={item.status}
              />
              <img className={classes.handle_img} src={reorderIcon} />
            </div>
          ))}
        </ReactSortable>
        <div className={classes.list_item}></div>
      </div>
      <div>
        <button className={classes.join_event_button}>Join Event</button>
      </div>
    </div>
  );
}

export default SchedulePage;
