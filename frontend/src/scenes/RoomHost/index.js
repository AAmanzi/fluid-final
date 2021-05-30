import React from 'react';
import { useHistory, Redirect } from 'react-router-dom';

import { dev, playersDevMode } from 'src/config';
import FibbageProvider from 'src/providers/fibbage';
import FibbageHost from 'src/components/FibbageHost';

const RoomHost = ({
  match: {
    params: { roomCode },
  },
}) => {
  const history = useHistory();

  if ((!dev || !playersDevMode) && history.action !== 'REPLACE') {
    return <Redirect to='/' />;
  }

  return (
    <FibbageProvider>
      <FibbageHost roomCode={roomCode} />
    </FibbageProvider>
  );
};

export default RoomHost;
