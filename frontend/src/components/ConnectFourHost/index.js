import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useConnectFourContext } from 'src/providers/connectFour';
import { CONNECT_FOUR_EVENT_TYPE } from 'src/consts/enums';
import { socket } from 'src/config';

import Board from './Board';
import PlayerList from './PlayerList';
import NotStarted from './NotStarted';

import { GameContainer, Screen } from './index.styled';
import Sidebar from './Sidebar';

const ConnectFourHost = () => {
  const { roomCode } = useParams();

  const {
    state: { playerOne, playerTwo, currentEvent, winnerId },
    addPlayer,
    removePlayer,
    startGame,
    dropCoin,
  } = useConnectFourContext();

  useEffect(() => {
    socket.off('host/receive/player-join');
    socket.on('host/receive/player-join', ({ name, socketId }) => {
      if (currentEvent !== CONNECT_FOUR_EVENT_TYPE.notStarted) {
        socket.emit('host/send/game-started', { socketId });

        return;
      }

      if (playerOne !== null && playerTwo !== null) {
        socket.emit('host/send/room-full', { socketId });

        return;
      }

      socket.emit('host/send/player-join', { socketId });
      addPlayer({ name, socketId });
    });

    return () => {
      socket.off('host/receive/player-join');
    };
  }, [addPlayer, currentEvent, playerOne, playerTwo]);

  useEffect(() => {
    socket.off('host/receive/player-disconnect');
    socket.on('host/receive/player-disconnect', ({ socketId }) => {
      socket.emit('host/send/player-disconnect', { socketId });
      removePlayer(socketId);
    });

    return () => {
      socket.off('host/receive/player-disconnect');
    };
  }, [removePlayer]);

  useEffect(() => {
    socket.off('host/receive/start-game');
    socket.on('host/receive/start-game', () => {
      startGame();

      socket.emit('host/send/start-game');
    });

    return () => {
      socket.off('host/receive/start-game');
    };
  }, [startGame]);

  useEffect(() => {
    socket.off('host/receive/drop-coin');
    socket.on('host/receive/drop-coin', ({ columnIndex }) => {
      dropCoin(columnIndex);
    });

    return () => {
      socket.off('host/receive/drop-coin');
    };
  }, [dropCoin]);

  const playerOneSocketId = playerOne?.socketId;
  const playerTwoSocketId = playerTwo?.socketId;

  useEffect(() => {
    if (currentEvent === CONNECT_FOUR_EVENT_TYPE.gameOver) {
      socket.emit('host/send/game-over', { winnerId });
    }

    if (currentEvent === CONNECT_FOUR_EVENT_TYPE.playerOneTurn) {
      socket.emit('host/send/player-turn', {
        socketId: playerOneSocketId,
      });
    }

    if (currentEvent === CONNECT_FOUR_EVENT_TYPE.playerTwoTurn) {
      socket.emit('host/send/player-turn', {
        socketId: playerTwoSocketId,
      });
    }
  }, [currentEvent, playerOneSocketId, playerTwoSocketId, winnerId]);

  const getContent = () => {
    if (currentEvent === CONNECT_FOUR_EVENT_TYPE.notStarted) {
      return <NotStarted />;
    }

    return <Board />;
  };

  return (
    <Screen>
      <GameContainer>
        <PlayerList />
        {getContent()}
        <Sidebar roomCode={roomCode} />
      </GameContainer>
    </Screen>
  );
};

export default ConnectFourHost;
