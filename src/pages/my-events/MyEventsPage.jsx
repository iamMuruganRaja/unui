


import React, { useEffect, useState } from "react";

import SplashScreen from "../../components/splash/SplashScreen";

import participants from "../../assets/card-icon.png";

import classes from "./MyEventsPage.module.css";
import { getMyEvents } from "../../services/events.services";
import LoadingComponent from "../../components/loading/LoadingComponent";
import { useAuthContext } from "../../components/contexts/AuthContext";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import EventCard from "../../components/cards/event/EventCard";

const MyEventsPage = () => {
  const [events, setEvents] = useState(null);

  const { authData } = useAuthContext();

  useEffect(() => {
    (async () => {
      const { data, error } = await getMyEvents();

      if (!!error) return;

      setEvents(data.data);
    })();
  }, []);

  

  return (
    <SplashScreen>
      <div className={classes.main_container}>
        <h1 className={classes.page_title}>My Events</h1>

        <div className={classes.card_carousel}>
          {!events ? (
            <LoadingComponent fill={false} />
          ) : (
            events.map((event) => (
              <EventCard event={event}/>
            ))
          )}
        </div>
        <br></br>
        <br></br>
        <br></br>
      </div>
      </SplashScreen>
    
  );
};

export default MyEventsPage;
