import React, { useState, useEffect } from 'react';

import { socket } from 'src/config';
import { ButtonPrimary } from 'src/components/styled';

import Prompt from './Prompt';
import ChooseAnswer from './ChooseAnswer';

import { Screen, GameContainer, Text } from './index.styled';

const FibbageClient = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [showStartButton, setShowStartButton] = useState(false);
  const [prompt, setPrompt] = useState(null);
  const [answers, setAnswers] = useState(null);

  useEffect(() => {
    socket.on('client/receive/toggle-start-button', () => {
      setShowStartButton(true);
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

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    socket.on('client/receive/start-answering', ({ prompt }) => {
      setPrompt(prompt);

      console.log(prompt);

      if (!isStarted) {
        setIsStarted(true);
        setShowStartButton(false);
      }
    });

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    socket.on('client/receive/start-choosing', ({ answers }) => {
      setAnswers(answers);
    });

    // eslint-disable-next-line
  }, []);

  const startGame = () => {
    socket.emit('client/send/start-game');
  };

  const handleEmitAnswer = (answer) => {
    socket.emit('client/send/answer', { answer, socketId: socket.id });
    setPrompt(null);
  };

  const handleEmitChoice = (choice) => {
    socket.emit('client/send/choice', { choice, socketId: socket.id });
    setAnswers(null);
  };

  const getContent = () => {
    if (!isStarted) {
      return (
        <>
          <Text>Waiting for players to join</Text>
          {showStartButton && (
            <ButtonPrimary onClick={startGame} content='START GAME'>
              START GAME
            </ButtonPrimary>
          )}
        </>
      );
    }

    return (
      <>
        {prompt && <Prompt prompt={prompt} onConfirm={handleEmitAnswer} />}
        {answers && (
          <ChooseAnswer answers={answers} onConfirm={handleEmitChoice} />
        )}
      </>
    );
  };

  return (
    <Screen>
      <GameContainer>{getContent()}</GameContainer>
    </Screen>
  );
};

export default FibbageClient;
