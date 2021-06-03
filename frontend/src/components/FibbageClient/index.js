import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';

import { socket } from 'src/config';
import { FIBBAGE_EVENT_TYPE } from 'src/consts/enums';

import IsWaiting from './IsWaiting';
import NotStarted from './NotStarted';
import ChoosingAnswers from './ChoosingAnswers';
import AnsweringPrompt from './AnsweringPrompt';
import GameOver from './GameOver';

import { Screen, GameContainer } from './index.styled';

const FibbageClient = () => {
  const history = useHistory();

  const [isModerator, setIsModerator] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);

  const [prompt, setPrompt] = useState(null);
  const [answers, setAnswers] = useState(null);
  const [currentEvent, setCurrentEvent] = useState(
    FIBBAGE_EVENT_TYPE.notStarted
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
    socket.on('client/receive/skipped', () => {
      setPrompt(null);
      setAnswers(null);
    });

    return () => {
      socket.off('client/receive/skipped');
    };
  }, []);

  useEffect(() => {
    socket.on('client/receive/start-answering', ({ prompt }) => {
      setCurrentEvent(FIBBAGE_EVENT_TYPE.answeringPrompt);
      setPrompt(prompt);
      setIsWaiting(false);
    });

    return () => {
      socket.off('client/receive/start-answering');
    };
  }, []);

  useEffect(() => {
    socket.on('client/receive/start-choosing', ({ answers }) => {
      setCurrentEvent(FIBBAGE_EVENT_TYPE.choosingAnswers);

      const availableAnswers = answers.filter(
        (answer) => answer.playerId !== socket.id
      );

      setAnswers(availableAnswers);
      setIsWaiting(false);
    });

    return () => {
      socket.off('client/receive/start-choosing');
    };
  }, []);

  useEffect(() => {
    socket.on('client/receive/game-over', () => {
      setCurrentEvent(FIBBAGE_EVENT_TYPE.gameOver);
    });

    return () => {
      socket.off('client/receive/game-over');
    };
  }, []);

  const onAnswerConfirm = () => {
    setPrompt(null);
    setIsWaiting(true);
  };

  const onChoiceConfirm = () => {
    setAnswers(null);
    setIsWaiting(true);
  };

  const getContent = () => {
    if (isWaiting) {
      return <IsWaiting />;
    }

    if (currentEvent === FIBBAGE_EVENT_TYPE.notStarted) {
      return <NotStarted canStartGame={isModerator} />;
    }

    if (currentEvent === FIBBAGE_EVENT_TYPE.gameOver) {
      return <GameOver canRestartGame={isModerator} />;
    }

    if (currentEvent === FIBBAGE_EVENT_TYPE.answeringPrompt && prompt) {
      return <AnsweringPrompt prompt={prompt} onConfirm={onAnswerConfirm} />;
    }

    if (currentEvent === FIBBAGE_EVENT_TYPE.choosingAnswers) {
      return <ChoosingAnswers answers={answers} onConfirm={onChoiceConfirm} />;
    }
  };

  return (
    <Screen>
      <GameContainer>{getContent()}</GameContainer>
    </Screen>
  );
};

export default FibbageClient;
