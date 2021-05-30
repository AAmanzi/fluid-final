import { useContext } from 'react';

import { FibbageContext } from '.';

export const useFibbageContext = () => useContext(FibbageContext);

export const useGame = () => {
  const {
    state: { gameStart, gameEnd },
    startGame,
  } = useFibbageContext();

  return {
    gameStart,
    gameEnd,
    startGame,
  };
};

export const usePlayers = () => {
  const {
    state: { players },
  } = useFibbageContext();

  return players;
};

export const useCurrentPrompt = () => {
  const {
    state: { currentPrompt },
  } = useFibbageContext();

  return currentPrompt;
};

export const useCurrentEvent = () => {
  const {
    state: { currentEvent },
  } = useFibbageContext();

  return currentEvent;
};
