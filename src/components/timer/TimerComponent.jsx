import React, { useState, useEffect } from "react";
import classes from "./TimerComponent.module.css"; // Make sure to import your CSS module here

const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;

const COLOR_CODES = {
  info: {
    color: "green",
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD,
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD,
  },
};

const TIME_LIMIT = 60; // Set the time limit in seconds

function TimerComponent() {
  const [timePassed, setTimePassed] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [remainingPathColor, setRemainingPathColor] = useState(COLOR_CODES.info.color);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimePassed(timePassed + 1);
      setTimeLeft(TIME_LIMIT - timePassed);
      setCircleDasharray();
      setRemainingPathColorClass();
      
      if (timeLeft === 0) {
        clearInterval(timerInterval);
      }
    }, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, [timePassed]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  const setRemainingPathColorClass = () => {
    if (timeLeft <= ALERT_THRESHOLD) {
      return COLOR_CODES.alert.color;
    } else if (timeLeft <= WARNING_THRESHOLD) {
      return COLOR_CODES.warning.color;
    } else {
      return COLOR_CODES.info.color;
    }
  };

  const calculateTimeFraction = () => {
    const rawTimeFraction = timeLeft / TIME_LIMIT;
    return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
  };

  const setCircleDasharray = () => {
    const circleDasharray = `${(calculateTimeFraction() * FULL_DASH_ARRAY).toFixed(0)} 283`;
    const remainingPathElement = document.getElementById("base-timer-path-remaining");
    if (remainingPathElement) {
      remainingPathElement.setAttribute("stroke-dasharray", circleDasharray);
    }
  };

  return (
    <div className={classes.base_timer}>
      <svg
        className={classes.base_timer__svg}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g className={classes.base_timer__circle}>
          <circle
            className={classes.base_timer__path_elapsed}
            cx="50"
            cy="50"
            r="45"
          />
          <path
            id="base-timer-path-remaining"
            strokeDasharray={FULL_DASH_ARRAY}
            className={`${classes.base_timer__path_remaining} ${remainingPathColor}`}
            d="M 50, 50 m -45, 0 a 45,45 0 1,0 90,0 a 45,45 0 1,0 -90,0"
          />
        </g>
      </svg>
      <span id="base-timer-label" className={classes.base_timer__label}>
        {formatTime(timeLeft)}
      </span>
    </div>
  );
}

export default TimerComponent;
