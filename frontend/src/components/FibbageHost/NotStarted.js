import React from 'react';

import { useFibbageContext } from 'src/providers/fibbage';

import { Text, WaitingContainer, ButtonStart } from './index.styled';

const NotStarted = () => {
  const {
    state: { players },
    startGame,
  } = useFibbageContext();

  return (
    <WaitingContainer>
      <Text>Waiting for players to join</Text>
      {players?.length > 1 && (
        <ButtonStart onClick={startGame} content='START GAME'>
          START GAME
        </ButtonStart>
      )}
    </WaitingContainer>
  );
};

export default NotStarted;
