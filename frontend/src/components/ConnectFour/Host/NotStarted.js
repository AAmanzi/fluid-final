import React from 'react';

import { useConnectFourContext } from 'src/providers/connectFour';
import { ButtonPrimary, Text } from 'src/components/styled';

import { NotStartedContainer } from './index.styled';

const NotStarted = () => {
  const {
    state: { playerOne, playerTwo },
    startGame,
  } = useConnectFourContext();

  return (
    <NotStartedContainer>
      <Text>Waiting for players to join</Text>
      {playerOne && playerTwo && (
        <ButtonPrimary onClick={startGame} content='START GAME'>
          START GAME
        </ButtonPrimary>
      )}
    </NotStartedContainer>
  );
};

export default NotStarted;
