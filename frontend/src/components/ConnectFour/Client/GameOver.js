import React from 'react';

import { socket } from 'src/config';
import { ButtonPrimary, Text } from 'src/components/styled';

const GameOver = ({ canRestartGame, isWinner }) => {
  const restartGame = () => {
    socket.emit('client/send/start-game');
  };

  return (
    <>
      <Text>{isWinner ? 'You won!' : 'You lost :('}</Text>
      {canRestartGame && (
        <ButtonPrimary onClick={restartGame} content='RESTART GAME'>
          RESTART GAME
        </ButtonPrimary>
      )}
    </>
  );
};

export default GameOver;
