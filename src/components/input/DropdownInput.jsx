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

  return (
    <div className={classes.main_container}>
      <motion.div
        initial={{ height: 40 }}
        animate={{ height: isDropdownOpen ? 160 : 40 }}
        className={classes.dropdown_container}
      >
        <button
          className={classes.input_container}
          onClick={toggleDropdown}
          {...props}
        >
          {selectedValue || placeholder}
          <img alt="icon" src={downArrow} className={classes.ctx_icon} />
        </button>
        {options.map((item) => (
          <button
            key={item}
            className={classes.option_container}
            onClick={() => handleOptionSelect(item)}
          >
            {item}
          </button>
        ))}
      </motion.div>
    </div>
  );
}

export default DropdownInput;
