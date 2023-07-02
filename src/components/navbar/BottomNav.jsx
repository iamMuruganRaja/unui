import { Link } from "react-router-dom";
import bottom1 from "../../assets/bottomnav-1.svg";
import bottom2 from "../../assets/bottomnav-2.svg";
import bottom3 from "../../assets/bottomnav-3.svg";

import classes from "./BottomNav.module.css";

const BottomNav = () => {
  return (
    <div className={classes.container}>
      <Link to="/register">
        <img alt="icon" src={bottom1} className={classes.hamburger_icon} />
      </Link>
      <Link to="/register">
        <img alt="icon" src={bottom2} className={classes.hamburger_icon} />
      </Link>
      <Link to="/register">
        <img alt="icon" src={bottom3} className={classes.hamburger_icon} />
      </Link>
    </div>
  );
};

export default BottomNav;
