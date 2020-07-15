import React from "react";
import { useHistory, Redirect } from "react-router-dom";
import { dev, playersDevMode } from "config.js";

import FibbageHost from "components/FibbageHost";
import FibbageProvider from "services/fibbage";

const RoomHost = ({
  match: {
    params: { roomCode },
  },
}) => {
  const history = useHistory();

  if ((!dev || !playersDevMode) && history.action !== "REPLACE") {
    return <Redirect to="/" />;
  }

  return (
    <FibbageProvider>
      <FibbageHost roomCode={roomCode} />
    </FibbageProvider>
  );
};

export default RoomHost;
