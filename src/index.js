import "../scss/app.scss";

import React from "react";
import ReactDOM from "react-dom";

import Timer from "./components/Timer";

const Target = document.querySelector("#app");
ReactDOM.render(<Timer />, Target);
