import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { socket, fibbageMaxPlayers } from 'src/config';
import { useFibbageContext } from 'src/providers/fibbage';
import { FIBBAGE_EVENT_TYPE } from 'src/consts/enums';

import PlayerList from './PlayerList';
import Sidebar from './Sidebar';

import NotStarted from './NotStarted';
import ChoosingAnswers from './ChoosingAnswers';
import AnsweringPrompt from './AnsweringPrompt';
import DisplayResults from './DisplayResults';
import GameOver from './GameOver';

import { Screen, GameContainer } from './index.styled';

const FibbageHost = () => {
  const { roomCode } = useParams();

  const {
    state: { currentEvent, players },
    addPlayer,
    removePlayer,
    startGame,
    finishAnsweringPrompt,
    finishChoosingAnswers,
    finishRound,
    setPlayerAnswer,
    setPlayerChoice,
  } = useFibbageContext();

  useEffect(() => {
    socket.off('host/receive/player-join');
    socket.on('host/receive/player-join', ({ name, socketId }) => {
      if (currentEvent !== FIBBAGE_EVENT_TYPE.notStarted) {
        socket.emit('host/send/game-started', { socketId });

        return;
      }

      if (players.length === fibbageMaxPlayers) {
        socket.emit('host/send/room-full', { socketId });

        return;
      }

      socket.emit('host/send/player-join', { socketId });
      addPlayer({ name, socketId });
    });

    return () => {
      socket.off('host/receive/player-join');
    };
  }, [addPlayer, currentEvent, players.length]);

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
    socket.off('host/receive/choice');
    socket.on('host/receive/choice', ({ choice, socketId }) => {
      setPlayerChoice(choice, socketId);
    });

    return () => {
      socket.off('host/receive/choice');
    };
  });

  useEffect(() => {
    if (!!players.length) {
      if (
        currentEvent === FIBBAGE_EVENT_TYPE.answeringPrompt &&
        players.every((player) => player.answer !== null)
      ) {
        finishAnsweringPrompt();
      }
    }
  }, [players, finishAnsweringPrompt, currentEvent]);

  useEffect(() => {
    if (!!players.length) {
      if (
        currentEvent === FIBBAGE_EVENT_TYPE.choosingAnswers &&
        players.every((player) => player.choice !== null)
      ) {
        finishChoosingAnswers();
      }
    }
  }, [players, finishChoosingAnswers, currentEvent]);

  const getContent = () => {
    if (currentEvent === FIBBAGE_EVENT_TYPE.notStarted) {
      return <NotStarted />;
    }

    if (currentEvent === FIBBAGE_EVENT_TYPE.answeringPrompt) {
      return <AnsweringPrompt />;
    }

    if (currentEvent === FIBBAGE_EVENT_TYPE.choosingAnswers) {
      return <ChoosingAnswers />;
    }

    if (currentEvent === FIBBAGE_EVENT_TYPE.displayResults) {
      return <DisplayResults onEnd={finishRound} />;
    }

    if (currentEvent === FIBBAGE_EVENT_TYPE.gameOver) {
      return <GameOver />;
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
