import React from 'react';
import { useHistory, Redirect, useParams } from 'react-router-dom';

import { dev, playersDevMode } from 'src/config';
import { ROOM_TYPE } from 'src/consts/enums';
import FibbageProvider from 'src/providers/fibbage';
import FibbageHost from 'src/components/FibbageHost';
import ConnectFourProvider from 'src/providers/connectFour';
import ConnectFourHost from 'src/components/ConnectFourHost';

const RoomHost = () => {
  const history = useHistory();
  const { roomType } = useParams();

  if ((!dev || !playersDevMode) && history.action !== 'REPLACE') {
    return <Redirect to='/' />;
  }

  switch (roomType) {
    case ROOM_TYPE.fibbage:
      return (
        <FibbageProvider>
          <FibbageHost />
        </FibbageProvider>
      );
    case ROOM_TYPE.connectFour:
      return (
        <ConnectFourProvider>
          <ConnectFourHost />
        </ConnectFourProvider>
      );
    default:
      return null;
  }
};

export default RoomHost;
