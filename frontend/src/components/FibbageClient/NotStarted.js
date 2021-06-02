import React from 'react';

import { socket } from 'src/config';
import { ButtonPrimary } from 'src/components/styled';

import { Text } from './index.styled';

const NotStarted = ({ canStartGame }) => {
  const startGame = () => {
    socket.emit('client/send/start-game');
  };

  return (
    <>
      <Text>Waiting for players to join</Text>
      {canStartGame && (
        <ButtonPrimary onClick={startGame} content='START GAME'>
          START GAME
        </ButtonPrimary>
      )}
    </>
  );
};

export default NotStarted;
