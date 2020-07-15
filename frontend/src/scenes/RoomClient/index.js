import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { dev, playersDevMode } from "config.js";

// import FibbageClient from "components/FibbageClient";

const RoomClient = () => {
  const history = useHistory();

  if ((!dev || !playersDevMode) && history.action !== "REPLACE") {
    return <Redirect to="/" />;
  }

  // return <FibbageClient />;
};

export default RoomClient;
