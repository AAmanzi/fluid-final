import React, { useState, useContext, useEffect } from "react";
import { FibbageContext } from "services/fibbage";

import useSocket from "services/socket/useSocket";

import usePlayers from "services/fibbage/usePlayers";
import useGame from "services/fibbage/useGame";
import eventTypes from "services/fibbage/eventTypes.const";

import PlayerList from "./PlayerList";
import DisplayResults from "./DisplayResults";
import Prompt from "./Prompt";
import Sidebar from "./Sidebar";

import BackgroundImage from "assets/background.png";

import {
  Screen,
  GameContainer,
  HeadingMain,
  Text,
  WaitingContainer,
  ButtonStart,
} from "./index.styled";

const FibbageHost = ({ roomCode }) => {
  const socket = useSocket();
  const {
    state: { currentEvent },
    addPlayer,
    removePlayer,
  } = useContext(FibbageContext);
  const { players } = usePlayers();
  const { gameStart, gameEnd, startGame } = useGame();
  const [showPrompt, setShowPrompt] = useState(false);

  const handleStartGame = () => {
    socket.emit("host/send/game-start", players);
    startGame();
  };

  useEffect(() => {
    if (currentEvent === eventTypes.CHOOSING_ANSWERS) {
      setShowPrompt(false);
    } else {
      setTimeout(() => setShowPrompt(true), 2500);
    }
  }, [currentEvent]);

  useEffect(() => {
    socket.on("client/join", ({ name, socketId }) => {
      addPlayer({ name, socketId });
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    socket.on("client/disconnect", ({ socketId }) => {
      removePlayer(socketId);
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    socket.on("host/recieve/game-start", () => {
      handleStartGame();
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    socket.on("host/recieve/prompt-answer", ({ answer }) => {
      // debounced({ answer });
    });
    // eslint-disable-next-line
  }, []);

  return (
    <Screen background={BackgroundImage}>
      <GameContainer>
        <PlayerList />

        {showPrompt && gameStart && !gameEnd && <Prompt prompt={prompt} />}
        {!showPrompt && gameStart && !gameEnd && (
          <DisplayResults prompt={prompt} />
        )}

        {!gameStart && (
          <WaitingContainer>
            <Text>Waiting for players to join</Text>
            {players?.length > 1 && (
              <ButtonStart onClick={handleStartGame} content="START GAME">
                START GAME
              </ButtonStart>
            )}
          </WaitingContainer>
        )}

        {gameEnd && <HeadingMain>Game over</HeadingMain>}
        <Sidebar roomCode={roomCode} />
      </GameContainer>
    </Screen>
  );
};

export default FibbageHost;
