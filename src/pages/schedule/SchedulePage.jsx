import React, { useEffect, useState } from "react";

import heroImg from "../../assets/details-hero.png";
import editIcon from "../../assets/edit-icon.svg";
import reorderIcon from "../../assets/reorder-icon.svg";

import classes from "./SchedulePage.module.css";
import { useParams } from "react-router-dom";
import { getEvent } from "../../services/events.services";
import dayjs from "dayjs";
import LoadingComponent from "../../components/loading/LoadingComponent";
import ScheduleDropdown from "../../components/dropdown/ScheduleDropdown";
import { ReactSortable } from "react-sortablejs";

function SchedulePage() {
  const { eventId } = useParams();

  const [eventDetails, setEventDetails] = useState(null);
  const [schedule, setSchedule] = useState([]);

  const [isEditOn, setIsEditOn] = useState(false);

  useEffect(() => {
    (async () => {
      const { data, error } = await getEvent(eventId);

      if (!!error) return;

      setEventDetails(data.data);
      setSchedule([...data.data.event_participants]);
    })();
  }, [eventId]);

  const updateEvent = () => {};

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
                range={`${dayjs(item.slot_start_time).format(
                  "hh:mm a"
                )}-${dayjs(item.slot_end_time).format("hh:mm a")} | ${
                  item.profile_info.first_name
                }`}
                event={item.status}
                handleSelect={updateEvent}
              />
              {isEditOn && (
                <img
                  className={classes.handle_img}
                  src={reorderIcon}
                  alt="reorder"
                />
              )}
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
