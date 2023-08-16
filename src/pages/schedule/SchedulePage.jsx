import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import dayjs from "dayjs";
import { ReactSortable } from "react-sortablejs";

import { getEvent, updateParticipantInfo } from "../../services/events.services";

import { BiPlayCircle } from 'react-icons/fa';
import { useAuthContext } from "../../components/contexts/AuthContext";
import LoadingComponent from "../../components/loading/LoadingComponent";
import ScheduleDropdown from "../../components/dropdown/ScheduleDropdown";
import liveImg from "../../assets/live.png"
// import playIcon from "../../assets/play-solid.svg"
import playIcon from "../../assets/play-icon.png"

import stopIcon from "../../assets/stop-icon.png"


import instagramColor from "../../assets/instagram-color.svg";
import facebookColor from "../../assets/facebook-color.svg";
import twitterColor from "../../assets/twitter-color.svg";

import heroImg from "../../assets/details-hero.png";
import editIcon from "../../assets/edit-icon.svg";
import reorderIcon from "../../assets/reorder-icon.svg";
import confirmSave from "../../assets/check-mark.png";

import classes from "./SchedulePage.module.css";
import useWebSocket from 'react-use-websocket';

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
  const [isEventLoading, setIsEventLoading] = useState(true);
  const WS_URL = 'wss://free.blr2.piesocket.com/v3/adcdc209-143a-4ef5-7c3d-eb1099941fe9?api_key=BGupnu2fqynVG6ewQN4P9OKboKIXtr09SCZJv0Pz';

  const { lastJsonMessage } = useWebSocket(WS_URL, {
    onOpen: () => {
      console.log('WebSocket connection established.');
    },
    onMessage: (evt) => {
      console.log(evt.data)
      // await fetchEventAndFillProgressBar();
      // setSchedule(newData);
    }
  });

  const handlePerformerAction = async (uuid,status) => {
    // Implement the logic to end the performance here
    try {
      setIsUpdating(true);
      const { data, error } = await updateParticipantInfo({
        status: status,
        uuid: uuid,
      });
  
      setIsUpdating(false);
  
      if (error) return;
      setSchedule([...data.data]);
      setIsUpdated(true);
    } catch (error) {
      // Handle any errors here
    }
  };
  

  async function fetchEventAndFillProgressBar() {
    setIsUpdating(true);
  
    try {
      // Delay fetching for the progress bar animation
      await new Promise((resolve) => {
        setTimeout(resolve, 5000); // Wait for 5 seconds
      });
  
      // Fetch the event data
      const { data, error } = await getEvent(eventId);
  
      if (error) {
        setIsUpdating(false);
        return;
      }
  
      // Set the schedule after the progress bar animation
      setTimeout(() => {
        setEventDetails(data.data);
        setSchedule([...data.data.event_participants]);
        setIsUpdating(false);
      }, 0); // Setting the timeout to 0ms to ensure it's executed after the event loop
  
      const isEditAllowed = data.data.event_participants.some(
        (part) =>
          part.role === "Host" && part.user_uuid === authData.userData.uuid
      );
      setIsEditAllowed(isEditAllowed);
    } catch (error) {
      // Handle any errors here
    }
  }

  useEffect(() => {
    

    // if (lastJsonMessage) {
    //   fetchEventAndFillProgressBar();
    // }
    fetchEventAndFillProgressBar();
  }, [eventId, authData.userData.uuid, lastJsonMessage]);

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

    // setIsUpdating(false);

    // if (error) return;
    // setSchedule([...data.data]);
    // setIsUpdated(true);
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
          <h2 className={classes.schedule_title}>{eventDetails.name}</h2>
          <h6 className={classes.schedule_date}>
            Schedule
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
      <div className={classes.content_container}>
      {isUpdating && (
    <div className={classes.progress_bar}>
      <div className={classes.progress}></div>
    </div>
  )}
          <div className={classes.schedule_list}>
          {/* <ReactSortable list={schedule} handle={classes.handle_img}> */}
          <ReactSortable disabled={true} list={schedule} setList={setSchedule} handle={classes.handle_img}>
          {sortedSequence.map((item, ind) => (
  <div key={item.id} className={`${classes.list_item}`}>
    {ind === 0 ? (
      <div key={item.id} className={classes.list_item}>
  <div className={`${classes.participant_container_bottom} ${classes.live_item}`}>
    <div className={classes.top_container}>
      {item.status === "live" && (
        <div className={classes.live_icon_container}>
          <img src={liveImg} alt="Live Now" className={classes.live_icon} />
        </div>
      )}
      <div className={classes.avatar_container}>
        <img className={classes.avatar} src="https://images.unsplash.com/photo-1616268164880-673b3ba611bb" alt="avatar" />
      </div>
      <div className={classes.details}>
        <h2 className={classes.name}>
          {item?.profile_info?.first_name} {item?.profile_info?.last_name}
        </h2>
        <p className={classes.text}>{item?.profile_info?.role}</p>
      </div>
    </div>
    <div className={classes.bottom_container}>
      <div className={classes.social_media_icons}>
        {item?.profile_info?.social_media_link && (
          <a
            href={item.profile_info.social_media_link}
            target="_blank"
            rel="noreferrer"
          >
            {item.profile_info.social_media_link.includes("twitter") && (
              <img src={twitterColor } alt="Twitter" className={classes.social_icon}  width="100px"
              height="100px"/>
            )}
            {item.profile_info.social_media_link.includes("instagram") && (
              <img src={instagramColor} alt="Instagram" className={classes.social_link} />
            )}
            {item.profile_info.social_media_link.includes("facebook") && (
              <img src={facebookColor} alt="Facebook" className={classes.social_icon} />
            )}
          </a>
        )}
      </div>
      {item.status === "live" && (
        <button className={classes.end_performance_button} onClick={() => handlePerformerAction(item.uuid, "upcoming_performance")}>
         <img src={stopIcon} alt="Stop" className={classes.action_icon} />
        </button>
      )}
      {item.status === "upcoming_performance" && (
        <button className={classes.end_performance_button} onClick={() => handlePerformerAction(item.uuid, "live")}>
         <img src={playIcon} alt="Play" className={classes.action_icon} />
        </button>
      )}
    </div>
  </div>
</div>

    ) : (
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
            //setSchedule(updatedSchedule);
          }}
        />
        {isEditOn && (
          <img
            className={classes.handle_img}
            src={reorderIcon}
            alt="Reorder"
          />
        )}
      </div>
    )}
  </div>
))}

</ReactSortable>

      <div className={classes.list_item}></div>
    </div>
    </div>


      <div>
        <button className={classes.join_event_button}>Join Event</button>
      </div>
    </div>
  );
}

export default SchedulePage;
