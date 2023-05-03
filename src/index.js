import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import dayjs from "dayjs";

import "./index.css";

var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
