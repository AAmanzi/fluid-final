import React from 'react';

import { FIBBAGE_EVENT_TYPE } from 'src/consts/enums';
import { useFibbageContext } from 'src/providers/fibbage';

import {
  PlayerWrapper,
  PlayerScore,
  PlayerIndex,
  PlayerListContainer,
  PlayerInfoWrapper,
} from './index.styled';

const PlayerList = () => {
  const {
    state: { players, currentEvent },
  } = useFibbageContext();

  const getHasAnswered = (player) => {
    if (currentEvent === FIBBAGE_EVENT_TYPE.answeringPrompt) {
      return player.answer !== null;
    }

    if (currentEvent === FIBBAGE_EVENT_TYPE.choosingAnswers) {
      return player.choice !== null;
    }

    if (currentEvent === FIBBAGE_EVENT_TYPE.displayResults) {
      return false;
    }
  };

  return (
    <PlayerListContainer>
      {players.map((player, index) => (
        <PlayerWrapper
          key={player.socketId}
          hasAnswered={getHasAnswered(player)}>
          <PlayerIndex>{index + 1}</PlayerIndex>
          <PlayerInfoWrapper>
            <h3>{player.name}</h3>
            <PlayerScore>{player.score}</PlayerScore>
          </PlayerInfoWrapper>
        </PlayerWrapper>
      ))}
    </PlayerListContainer>
  );
};

export default PlayerList;
