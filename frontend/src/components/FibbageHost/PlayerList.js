import React from 'react';

import { FIBBAGE_EVENT_TYPE } from 'src/consts/enums';
import { useFibbageContext } from 'src/providers/fibbage';

import {
  PlayerName,
  PlayerCard,
  PlayerTag,
  PlayerTags,
  PlayerNumber,
  PlayerListContainer,
  Players,
  PlayerInfo,
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
      <Players>
        {players.map((player, index) => (
          <PlayerCard
            key={player.socketId}
            hasAnswered={getHasAnswered(player)}>
            <PlayerNumber>{index + 1}</PlayerNumber>
            <PlayerInfo>
              <PlayerName>{player.name}</PlayerName>
              <PlayerTags>
                <PlayerTag>{player.score}</PlayerTag>
              </PlayerTags>
            </PlayerInfo>
          </PlayerCard>
        ))}
      </Players>
    </PlayerListContainer>
  );
};

export default PlayerList;
