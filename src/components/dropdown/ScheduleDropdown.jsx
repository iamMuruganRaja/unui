import React, { useState } from "react";
import { motion } from "framer-motion";

import classes from "./ScheduleDropdown.module.css";

const options =
  // = ["Present", "Absent", "Upcoming Performance", "Live Now"];
  [];

function DropdownInput({
  placeholder,
  range,
  event,
  selectedValue,
  handleSelect,
  ...props
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  const handleOptionSelect = (value) => {
    toggleDropdown();
    handleSelect(value);
  };

  const getColor = (value) => {
    switch (value) {
      case "Preset":
        return "#8BBF69";
      case "Absent":
        return "#CB4747";
      case "Upcoming Performance":
        return "#CB9E47";
      case "Live Now":
        return "#A458D2";
      default:
        return "#8BBF69";
    }
  };

  return (
    <div className={classes.main_container}>
      <motion.div
        initial={{ height: 50 }}
        animate={{ height: isDropdownOpen ? 50 * (options.length + 1) : 50 }}
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
        {options.map((item) => (
          <button
            key={item}
            className={classes.option_container}
            onClick={() => handleOptionSelect(item)}
            style={{ backgroundColor: getColor(item) }}
          >
            {item}
          </button>
        ))}
      </motion.div>
    </div>
  );
}

export default DropdownInput;
