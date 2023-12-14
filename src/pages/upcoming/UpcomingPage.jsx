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
import Header from "../../components/topbar/Headers";

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
    
      <div className={classes.container}>
     <Header /> 
        <h1 className={classes.page_title}>
          <span>Upcoming Events</span>
          <FontAwesomeIcon
            icon={faPlusCircle}
            style={{ color: "#ff623e" }}
            className={classes.plusIcon}
            size="2xl"
            
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
    
  );
};

export default UpcomingPage;
