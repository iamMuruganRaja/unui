import { Link, useLocation } from "react-router-dom";
import bottom1 from "../../assets/bottomnav-1.svg";
import bottom1Active from "../../assets/bottomnav-1-active.svg";
import bottom2 from "../../assets/bottomnav-2.svg";
import bottom2Active from "../../assets/bottomnav-2-active.svg";
import bottom3 from "../../assets/bottomnav-3.svg";
import bottom3Active from "../../assets/bottomnav-3-active.svg";

import classes from "./BottomNav.module.css";
import { useAuthContext } from "../contexts/AuthContext";

const BottomNav = () => {
  const { pathname } = useLocation();
  const { authData } = useAuthContext();

  // if (pathname === "/register" ) return <></>;

  return (
    <div className={classes.container}>
      <Link to="/upcoming">
        {pathname === "/upcoming" ? (
          <img
            alt="icon"
            src={bottom1Active}
            className={classes.hamburger_icon_active}
          />
        ) : (
          <img alt="icon" src={bottom1} className={classes.hamburger_icon} />
        )}
      </Link>
      <Link to="/profile">
        {pathname === "/profile" ? (
          <img
            alt="icon"
            src={bottom2Active}
            className={classes.hamburger_icon_active}
          />
        ) : (
          <img alt="icon" src={bottom2} className={classes.hamburger_icon} />
        )}
      </Link>
      <Link to="/my-events">
        {pathname === "/my-events" ? (
          <img
            alt="icon"
            src={bottom3Active}
            className={classes.hamburger_icon_active}
          />
        ) : (
          <img alt="icon" src={bottom3} className={classes.hamburger_icon} />
        )}
      </Link>
    </div>
  );
};

export default BottomNav;
