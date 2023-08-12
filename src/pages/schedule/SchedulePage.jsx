import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import dayjs from "dayjs";
import { ReactSortable } from "react-sortablejs";

import { getEvent, updateParticipantInfo } from "../../services/events.services";
import { useAuthContext } from "../../components/contexts/AuthContext";
import LoadingComponent from "../../components/loading/LoadingComponent";
import ScheduleDropdown from "../../components/dropdown/ScheduleDropdown";

import heroImg from "../../assets/details-hero.png";
import editIcon from "../../assets/edit-icon.svg";
import reorderIcon from "../../assets/reorder-icon.svg";
import confirmSave from "../../assets/check-mark.png";

import classes from "./SchedulePage.module.css";

function SchedulePage() {
  const { eventId } = useParams();
  const [eventDetails, setEventDetails] = useState(null);
  const [schedule, setSchedule] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [isEditOn, setIsEditOn] = useState(false);
  const [isEditAllowed, setIsEditAllowed] = useState(false);
  const [isEditModeOn, setIsEditModeOn] = useState(false);
  const { authData } = useAuthContext();

  useEffect(() => {
    async function fetchEvent() {
      const { data, error } = await getEvent(eventId);

      if (error) return;

      setEventDetails(data.data);
      setSchedule([...data.data.event_participants]);

      const isEditAllowed = data.data.event_participants.some(
        (part) => part.role === "Host" && part.user_uuid === authData.userData.uuid
      );
      setIsEditAllowed(isEditAllowed);
    }

    fetchEvent();
  }, [eventId, authData.userData.uuid]);

  const toggleDropdown = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const toggleEdit = () => {
    setIsEditModeOn((prevEditMode) => !prevEditMode);
  };

  const handleDropdownSelect = async (uuid, status) => {
    setIsUpdating(true);
    const { data, error } = await updateParticipantInfo(
      {
        status: status,
        uuid:uuid,
      }
    );

    setIsUpdating(false);

    if (error) return;
    setSchedule([...data.data]);
    setIsUpdated(true);
  };


  // Define a custom sorting function
const customSort = (a, b) => {
  // First priority: "live" items come first
  if (a.status === "live" && b.status !== "live") return -1;
  if (a.status !== "live" && b.status === "live") return 1;

  // Second priority: "upcoming_performance" items come next
  if (a.status === "upcoming_performance" && b.status !== "upcoming_performance") return -1;
  if (a.status !== "upcoming_performance" && b.status === "upcoming_performance") return 1;

  // Third priority: "performed" items come next
  if (a.status === "performed" && b.status !== "performed") return -1;
  if (a.status !== "performed" && b.status === "performed") return 1;

  // Fourth priority: "present" items with a sequence come next (sorted by sequence)
  if (a.status === "present" && a.sequence && !b.sequence) return -1;
  if (!a.sequence && b.status === "present" && b.sequence) return 1;
  if (a.status === "present" && a.sequence && b.status === "present" && b.sequence) {
    return a.sequence - b.sequence;
  }

  // Fifth priority: "present" items without a sequence come next (sorted by sequence)
  if (a.status === "present" && !a.sequence && b.status === "present" && !b.sequence) {
    return a.sequence - b.sequence;
  }
  if (!a.sequence && b.status === "present" && !b.sequence) return -1;
  if (a.status === "present" && a.sequence && b.status === "present" && !b.sequence) return -1;

  // Sixth priority: "absent" items come last (sorted by sequence)
  if (a.status === "absent" && b.status === "absent") {
    if (a.sequence && b.sequence) return a.sequence - b.sequence;
    if (!a.sequence && b.sequence) return -1;
    if (a.sequence && !b.sequence) return 1;
    return 0;
  }
  if (a.status === "absent") return 1;
  if (b.status === "absent") return -1;

  // Default: no change in order
  return 0;
};

// Sort the sequence array using the custom sorting function
  const sortedSequence = schedule.sort(customSort);

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
        {!isEditModeOn && isEditAllowed && (
          <img src={editIcon} alt="Edit" onClick={toggleEdit} />
        )}
        {isEditModeOn && (
          <img
            src={confirmSave}
            alt="Confirm"
            onClick={toggleEdit}
            width="35px"
            height="35px"
          />
        )}
      </div>
      

          <div className={classes.schedule_list}>
      <ReactSortable list={schedule} setList={setSchedule} handle={classes.handle_img}>
        {sortedSequence
          .map((item, ind) => (
            <div key={item.id} className={classes.list_item}>
              <div onClick={() => toggleDropdown(ind)}>
                <ScheduleDropdown
                  uuid={item.uuid}
                  selectedValue={item.status}
                  range={item.profile_info.first_name || `Performance ${ind}`}
                  isOpen={expandedIndex === ind && isEditAllowed}
                  handleSelect={(value) => {
                    handleDropdownSelect(item.uuid, value);
                    const updatedSchedule = schedule.map((scheduleItem) =>
                      scheduleItem.uuid === item.uuid
                        ? { ...scheduleItem, status: value }
                        : scheduleItem
                    );
                    setSchedule(updatedSchedule);
                  }}
                />
              </div>
              {isEditOn && <img className={classes.handle_img} src={reorderIcon} alt="Reorder" />}
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
