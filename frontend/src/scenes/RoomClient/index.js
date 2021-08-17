import React from 'react';
import { Redirect, useHistory, useParams } from 'react-router-dom';

import { dev, playersDevMode } from 'src/config';
import { ROOM_TYPE } from 'src/consts/enums';
import FibbageClient from 'src/components/FibbageClient';
import ConnectFourClient from 'src/components/ConnectFourClient';

const RoomClient = () => {
  const history = useHistory();
  const { roomType } = useParams();

  if ((!dev || !playersDevMode) && history.action !== 'REPLACE') {
    return <Redirect to='/' />;
  }

  switch (roomType) {
    case ROOM_TYPE.fibbage:
      return <FibbageClient />;
    case ROOM_TYPE.connectFour:
      return <ConnectFourClient />;
    default:
      return null;
  }
};

export default RoomClient;
