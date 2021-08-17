import React from 'react';
import { CONNECT_FOUR_EVENT_TYPE, PLAYER } from 'src/consts/enums';

import { useConnectFourContext } from 'src/providers/connectFour';
import {
  PlayerChip,
  PlayerContainer,
  PlayerListContainer,
  PlayerScore,
} from './index.styled';

const PlayerList = () => {
  const {
    state: { playerOne, playerTwo, currentEvent },
  } = useConnectFourContext();

  const isPlayerOneTurn =
    currentEvent === CONNECT_FOUR_EVENT_TYPE.playerOneTurn;
  const isPlayerTwoTurn =
    currentEvent === CONNECT_FOUR_EVENT_TYPE.playerTwoTurn;

  return (
    <PlayerListContainer>
      {playerOne && (
        <PlayerContainer value={PLAYER.one} active={isPlayerOneTurn}>
          <PlayerChip value={PLAYER.one} active={isPlayerOneTurn} />
          <div>
            <h3>{playerOne.name}</h3>
            <PlayerScore>Score: {playerOne.score}</PlayerScore>
          </div>
        </PlayerContainer>
      )}
      {playerTwo && (
        <PlayerContainer value={PLAYER.two} active={isPlayerTwoTurn}>
          <PlayerChip value={PLAYER.two} active={isPlayerTwoTurn} />
          <div>
            <h3>{playerTwo.name}</h3>
            <PlayerScore>Score: {playerTwo.score}</PlayerScore>
          </div>
        </PlayerContainer>
      )}
    </PlayerListContainer>
  );
};

export default PlayerList;
