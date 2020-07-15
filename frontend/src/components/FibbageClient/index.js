import React, { useState, useEffect } from "react";
import useSocket from "services/socket/useSocket";

import Prompt from "./Prompt";
import ChooseAnswer from "./ChooseAnswer";

import BackgroundImageMobile from "assets/background-phone.png";

import { Screen, GameContainer, Text } from "./index.styled";

const FibbageClient = () => {
  const socket = useSocket();

  const [isStarted, setIsStarted] = useState(false);
  const [prompt, setPrompt] = useState(null);
  const [answers, setAnswers] = useState(null);

  useEffect(() => {
    socket.on("client/recieve/game-start", () => {
      setIsStarted(true);
    });

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    socket.on("client/recieve/skipped", () => {
      setPrompt(null);
      setAnswers(null);
    });

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    socket.on("client/recieve/prompt", ({ prompt }) => {
      setPrompt(prompt);
    });

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    socket.on("client/recieve/answers", ({ answers }) => {
      setAnswers(answers);
    });

    // eslint-disable-next-line
  }, []);

  const handleEmitAnswer = (answer) => {
    socket.emit("client/send/answer", { answer, socketId: socket.id });
    setPrompt(null);
  };

  const handleEmitChoice = (choice) => {
    socket.emit("client/send/choice", { choice, socketId: socket.id });
    setAnswers(null);
  };

  if (!isStarted) {
    return (
      <Screen background={BackgroundImageMobile}>
        <GameContainer>
          <Text>Waiting for players to join</Text>
        </GameContainer>
      </Screen>
    );
  }

  return (
    <Screen background={BackgroundImageMobile}>
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
