import React, { useEffect } from 'react';

import { socket } from 'src/config';
import { useFibbageContext } from 'src/providers/fibbage/hooks';
import { FIBBAGE_EVENT_TYPE } from 'src/consts/enums';

import PlayerList from './PlayerList';
import ChoosingAnswers from './ChoosingAnswers';
import AnsweringPrompt from './AnsweringPrompt';
import Sidebar from './Sidebar';

import {
  Screen,
  GameContainer,
  HeadingMain,
  Text,
  WaitingContainer,
  ButtonStart,
} from './index.styled';

const FibbageHost = ({ roomCode }) => {
  const {
    state: { currentEvent, currentPrompt, gameStart, gameEnd, players },
    addPlayer,
    removePlayer,
    setPlayerAnswer,
    handleNextTurn,
    startGame,
  } = useFibbageContext();

  useEffect(() => {
    socket.off('host/receive/player-join');
    socket.on('host/receive/player-join', ({ name, socketId }) => {
      socket.emit('host/send/player-join', { socketId });
      addPlayer({ name, socketId });
    });

    return () => {
      socket.off('host/receive/player-join');
    };
  }, [addPlayer]);

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
    });

    return () => {
      socket.off('host/receive/start-game');
    };
  }, [startGame]);

  useEffect(() => {
    socket.off('host/receive/answer');
    socket.on('host/receive/answer', ({ answer, socketId }) => {
      setPlayerAnswer(answer, socketId);
    });

    return () => {
      socket.off('host/receive/answer');
    };
  }, [setPlayerAnswer]);

  useEffect(() => {
    if (
      !!players.length &&
      players.every((player) => player.answer !== null) &&
      currentEvent === FIBBAGE_EVENT_TYPE.answeringPrompt
    ) {
      handleNextTurn();
    }
  }, [players, handleNextTurn, currentEvent]);

  const getContent = () => {
    if (!gameStart) {
      return (
        <WaitingContainer>
          <Text>Waiting for players to join</Text>
          {players?.length > 1 && (
            <ButtonStart onClick={startGame} content='START GAME'>
              START GAME
            </ButtonStart>
          )}
        </WaitingContainer>
      );
    }

    if (gameEnd) {
      return <HeadingMain>Game over</HeadingMain>;
    }

    if (currentEvent === FIBBAGE_EVENT_TYPE.answeringPrompt) {
      return <AnsweringPrompt prompt={currentPrompt} />;
    }

    if (currentEvent === FIBBAGE_EVENT_TYPE.choosingAnswers) {
      return <ChoosingAnswers prompt={currentPrompt} />;
    }
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

export default FibbageHost;
