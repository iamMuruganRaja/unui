
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import classes from "./ScheduleDropdown.module.css";

const options = ["present", "absent", "upcoming_performance", "live", "performed"];

function DropdownInput({
  placeholder,
  range,
  event,
  selectedValue,
  handleSelect,
  isOpen,
  ...props
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProgressBarVisible, setIsProgressBarVisible] = useState(false);
  const [isProgressBarReset, setIsProgressBarReset] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  const handleOptionSelect = (value) => {
    toggleDropdown();
    setIsProgressBarVisible(true); // Show progress bar when option is selected
    setIsProgressBarReset(true); // Reset progress bar animation
    handleSelect(value);
    
  };
  useEffect(() => {
    if (isProgressBarReset) {
      // Reset progress bar animation after a short delay
      const timer = setTimeout(() => {
        setIsProgressBarVisible(false);
        setIsProgressBarReset(false);
      }, 5000); // Set the same duration as your animation
      return () => clearTimeout(timer);
    }
  }, [isProgressBarReset]);

  const getColor = (value) => {
    switch (value) {
      case "present":
        return "#8BBF69";
      case "absent":
        return "#CB4747";
      case "upcoming_performance":
        return "#CB9E47";
      case "live":
        return "#A458D2";
      case "performed":
        return "#7477e3";
      default:
        return "#8BBF69";
    }
  };

  return (
    <div className={classes.main_container}>
     {isProgressBarVisible && ( <div
    className={classes.progress_bar}
    style={{ width: false ? "100%" : 0 }} // Adjust the width based on isOpen
  ></div>
  )}
      <motion.div
        initial={{ height: 50 }}
        animate={{ height: isOpen ? 50 * (options.length + 1) : 50 }} // Animate height based on isOpen
        className={classes.dropdown_container}
      >
        <button
          className={classes.input_container}
          onClick={toggleDropdown}
          style={{ backgroundColor: getColor(selectedValue) }}
          {...props}
        >
          <p>{range}</p>
          <p>{event}</p>
        </button>
        { isOpen && options.map((item) => (
          <button
            key={item}
            className={classes.option_container}
            onClick={() => handleOptionSelect(item)}
            style={{ backgroundColor: getColor(item) }}
          >
            {item}
          </button>
        ))}
         {isProgressBarVisible && (
          <div className={classes.progress_bar}></div>
        )}
      </motion.div>
    </div>
  );
}

export default DropdownInput;
