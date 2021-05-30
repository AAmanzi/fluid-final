import React, { useState, useEffect } from 'react';

import { socket } from 'src/config';

import Prompt from './Prompt';
import ChooseAnswer from './ChooseAnswer';

import { Screen, GameContainer, Text } from './index.styled';

const FibbageClient = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [prompt, setPrompt] = useState(null);
  const [answers, setAnswers] = useState(null);

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

      if (!isStarted) {
        setIsStarted(true);
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

  const handleEmitAnswer = (answer) => {
    socket.emit('client/send/answer', { answer, socketId: socket.id });
    setPrompt(null);
  };

  const handleEmitChoice = (choice) => {
    socket.emit('client/send/choice', { choice, socketId: socket.id });
    setAnswers(null);
  };

  if (!isStarted) {
    return (
      <Screen>
        <GameContainer>
          <Text>Waiting for players to join</Text>
        </GameContainer>
      </Screen>
    );
  }

  return (
    <Screen>
      <GameContainer>
        {prompt && <Prompt prompt={prompt} onConfirm={handleEmitAnswer} />}

        {answers && (
          <ChooseAnswer answers={answers} onConfirm={handleEmitChoice} />
        )}
      </GameContainer>
    </Screen>
  );
};

export default FibbageClient;
