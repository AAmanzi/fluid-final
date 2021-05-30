import React from 'react';

import { usePlayers } from 'src/providers/fibbage/hooks';

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
  const players = usePlayers();

  return (
    <PlayerListContainer>
      <Players>
        {players.map((player, index) => (
          <PlayerCard key={player.socketId}>
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
