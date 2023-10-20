import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import SplashScreen from "../../components/splash/SplashScreen";
import participants from "../../assets/card-icon.png";
import classes from "./UpcomingPage.module.css";
import { getEvents } from "../../services/events.services";
import LoadingComponent from "../../components/loading/LoadingComponent";
import heroImg from "../../assets/common-hero.svg";
import { useAuthContext } from "../../components/contexts/AuthContext";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import EventCard from "../../components/cards/event/EventCard";
import { useNavigate } from "react-router-dom";

const UpcomingPage = () => {
  const [events, setEvents] = useState(null);
  const { authData } = useAuthContext();

  useEffect(() => {
    (async () => {
      const { data, error } = await getEvents();
      if (!!error) return;
      setEvents(data.data);
    })();
  }, []);

  const navigate = useNavigate();
  const handleRedirectToEventForm = () => {
    // Navigate to the EventForm component with any necessary data
    navigate("/events", { state: { event: null } });
  };

  
  return (
    <SplashScreen>
      <div className={classes.container}>
      <img className={classes.hero} src={heroImg} alt="img" />
        <h1 className={classes.page_title}>
          <span>Upcoming Events</span>
          <FontAwesomeIcon
            icon={faPlusCircle}
            style={{ color: "#2ed365" }}
            className={classes.plusIcon}
            onClick={handleRedirectToEventForm} // Call the function on click
          />
        </h1>

        <div className={classes.card_carousel}>
          {!events ? (
            <LoadingComponent fill={false} />
          ) : (
            events.map((event) => <EventCard event={event} />)
          )}
        </div>
        <br />
        <br />
        <br />
      </div>
    </SplashScreen>
  );
};

export default UpcomingPage;
