import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { socket } from 'src/config';
import { CONNECT_FOUR_EVENT_TYPE } from 'src/consts/enums';

import NotStarted from './NotStarted';
import GameOver from './GameOver';
import Board from './Board';

import { Screen, GameContainer } from './index.styled';

const ConnectFourClient = () => {
  const history = useHistory();

  const [isModerator, setIsModerator] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const [board, setBoard] = useState(null);
  const [currentEvent, setCurrentEvent] = useState(
    CONNECT_FOUR_EVENT_TYPE.notStarted
  );

  useEffect(() => {
    socket.off('client/receive/host-disconnect');
    socket.on('client/receive/host-disconnect', () => {
      history.push('/');
    });

    return () => {
      socket.off('client/receive/host-disconnect');
    };
  }, [history]);

  useEffect(() => {
    socket.on('client/receive/is-moderator', () => {
      setIsModerator(true);
    });

    return () => {
      socket.off('client/receive/is-moderator');
    };
  }, []);

  useEffect(() => {
    socket.on('client/receive/game-over', () => {
      setCurrentEvent(CONNECT_FOUR_EVENT_TYPE.gameOver);
    });

    return () => {
      socket.off('client/receive/game-over');
    };
  }, []);

  useEffect(() => {
    socket.on('client/receive/start-game', () => {
      setCurrentEvent(null);
    });

    return () => {
      socket.off('client/receive/start-game');
    };
  }, []);

  useEffect(() => {
    socket.on('client/receive/player-turn', () => {
      setIsPlaying(true);
    });

    return () => {
      socket.off('client/receive/player-turn');
    };
  }, []);

  useEffect(() => {
    socket.on('client/receive/update-board', ({ board }) => {
      setBoard(board);
    });

    return () => {
      socket.off('client/receive/update-board');
    };
  }, []);

  const onAfterDropCoin = () => {
    setIsPlaying(false);
  };

  const getContent = () => {
    if (currentEvent === CONNECT_FOUR_EVENT_TYPE.notStarted) {
      return <NotStarted canStartGame={isModerator} />;
    }

    if (currentEvent === CONNECT_FOUR_EVENT_TYPE.gameOver) {
      return <GameOver canRestartGame={isModerator} />;
    }

    if (board !== null) {
      return (
        <Board
          board={board}
          isPlaying={isPlaying}
          onAfterDropCoin={onAfterDropCoin}
        />
      );
    }
  };

  return (
    <Screen>
      <GameContainer>{getContent()}</GameContainer>
    </Screen>
  );
};

export default ConnectFourClient;
