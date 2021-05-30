import React, { useState, useEffect } from 'react';

import { socket } from 'src/config';
import { ButtonPrimary } from 'src/components/styled';

import ChoosingAnswers from './ChoosingAnswers';
import AnsweringPrompt from './AnsweringPrompt';

import { Screen, GameContainer, Text } from './index.styled';
import { FIBBAGE_EVENT_TYPE } from 'src/consts/enums';

const FibbageClient = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [isFirstPlayer, setIsFirstPlayer] = useState(false);
  const [isWaitingOthers, setIsWaitingOthers] = useState(false);

  const [prompt, setPrompt] = useState(null);
  const [answers, setAnswers] = useState(null);
  const [currentEvent, setCurrentEvent] = useState(FIBBAGE_EVENT_TYPE);

  useEffect(() => {
    socket.on('client/receive/toggle-start-button', () => {
      setIsFirstPlayer(true);
    });

    return () => {
      socket.off('client/receive/toggle-start-button');
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
    socket.off('client/receive/start-answering');
    socket.on('client/receive/start-answering', ({ prompt }) => {
      setCurrentEvent(FIBBAGE_EVENT_TYPE.answeringPrompt);
      setPrompt(prompt);
      setIsWaitingOthers(false);

      if (!isStarted) {
        setIsStarted(true);
      }
    });

    return () => {
      socket.off('client/receive/start-answering');
    };
  }, [isStarted]);

  useEffect(() => {
    socket.on('client/receive/start-choosing', ({ answers }) => {
      setCurrentEvent(FIBBAGE_EVENT_TYPE.choosingAnswers);
      setAnswers(answers);
      setIsWaitingOthers(false);
    });

    return () => {
      socket.off('client/receive/start-choosing');
    };
  }, []);

  const startGame = () => {
    socket.emit('client/send/start-game');
  };

  const onAnswerConfirm = () => {
    setPrompt(null);
    setIsWaitingOthers(true);
  };

  const onChoiceConfirm = () => {
    setAnswers(null);
    setIsWaitingOthers(true);
  };

  const getContent = () => {
    if (!isStarted) {
      return (
        <>
          <Text>Waiting for players to join</Text>
          {isFirstPlayer && (
            <ButtonPrimary onClick={startGame} content='START GAME'>
              START GAME
            </ButtonPrimary>
          )}
        </>
      );
    }

    if (isWaitingOthers) {
      return <Text>Sit back and relax</Text>;
    }

    if (currentEvent === FIBBAGE_EVENT_TYPE.answeringPrompt) {
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
