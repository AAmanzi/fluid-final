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
import DisplayResults from './DisplayResults';

const FibbageHost = ({ roomCode }) => {
  const {
    state: { currentEvent, gameStart, gameEnd, players },
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
      return <AnsweringPrompt />;
    }

    if (currentEvent === FIBBAGE_EVENT_TYPE.choosingAnswers) {
      return <ChoosingAnswers />;
    }

    if (currentEvent === FIBBAGE_EVENT_TYPE.displayResults) {
      return <DisplayResults onEnd={finishRound} />;
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
