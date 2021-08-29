import React, { useEffect } from 'react';

import { useFibbageContext } from 'src/providers/fibbage';
import { Text } from 'src/components/styled';
import {
  GameOverPlayerResultsWrapper,
  GameOverPlayerResult,
} from './index.styled';
import { socket } from 'src/config';

const PLAYER_DELAY = 1000;

const GameOver = () => {
  const {
    state: { players },
  } = useFibbageContext();

  useEffect(() => {
    socket.emit('host/send/game-over');
  }, []);

  const orderedPlayers = players.sort((curr, next) => curr.score - next.score);

  return (
    <div>
      <Text>Results</Text>
      <GameOverPlayerResultsWrapper>
        {orderedPlayers.map((player, index) => (
          <GameOverPlayerResult
            key={player.socketId}
            delay={PLAYER_DELAY * index}>
            <h3>{player.name}</h3>
            <p>{player.score}</p>
          </GameOverPlayerResult>
        ))}
      </GameOverPlayerResultsWrapper>
    </div>
  );
};

export default GameOver;
