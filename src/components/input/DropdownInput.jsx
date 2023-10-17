import React, { useState } from "react";
import { motion } from "framer-motion";
import downArrow from "../../assets/down-arrow.svg";
import classes from "./DropdownInput.module.css";

function DropdownInput({
  options,
  placeholder,
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

  // Calculate the maximum number of options to display (adjust as needed)
  const maxVisibleOptions = 5; // You can change this number

  return (
    <div className={classes.mainContainer}>
      <motion.div
        initial={{ height: 50 }}
        animate={{ height: isDropdownOpen ? "auto" : 50 }}
        className={classes.dropdownContainer}
      >
        <button
          className={classes.inputContainer}
          onClick={toggleDropdown}
          {...props}
        >
          {selectedValue || placeholder}
          <img alt="icon" src={downArrow} className={classes.icon} />
        </button>
        <div
          className={classes.optionsContainer}
          style={{
            maxHeight: isDropdownOpen
              ? `${maxVisibleOptions * 50}px`
              : "0px", // Hide when closed
            overflowY: "auto", // Enable scrolling
          }}
        >
          {options.map((item) => (
            <button
              key={item}
              className={classes.optionContainer}
              onClick={() => handleOptionSelect(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default DropdownInput;
