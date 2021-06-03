import React from 'react';

import { useFibbageContext } from 'src/providers/fibbage';
import { ButtonPrimary, Text } from 'src/components/styled';

import { NotStartedContainer } from './index.styled';

const NotStarted = () => {
  const {
    state: { players },
    startGame,
  } = useFibbageContext();

  return (
    <NotStartedContainer>
      <Text>Waiting for players to join</Text>
      {players?.length > 1 && (
        <ButtonPrimary onClick={startGame} content='START GAME'>
          START GAME
        </ButtonPrimary>
      )}
    </NotStartedContainer>
  );
};

export default NotStarted;
