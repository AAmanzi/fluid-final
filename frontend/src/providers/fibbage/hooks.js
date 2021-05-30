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
