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
    state: { currentEvent, displayedPrompt },
    addPlayer,
    removePlayer,
    setPlayerAnswer,
    handleNextTurn,
  } = useContext(FibbageContext);
  const players = usePlayers();
  const { gameStart, gameEnd, startGame } = useGame();
  const [showPrompt, setShowPrompt] = useState(false);

  const handleStartGame = () => {
    startGame();
  };

  const handleEmitChoosing = () => {
    socket.emit("host/send/start-choosing", { players });
  };

  const handleEmitAnswering = () => {
    socket.emit("host/send/start-answering", {
      players,
      prompt: displayedPrompt,
    });
  };

  useEffect(() => {
    if (currentEvent === eventTypes.CHOOSING_ANSWERS) {
      setShowPrompt(false);
      handleEmitChoosing();
    } else {
      setShowPrompt(true);
      handleEmitAnswering();
    }
    // eslint-disable-next-line
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
    socket.on("host/receive/game-start", () => {
      handleStartGame();
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    socket.on("host/receive/answer", ({ answer, socketId }) => {
      setPlayerAnswer(answer, socketId);
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (
      !!players.length &&
      !players.some((player) => !player.answer) &&
      currentEvent === eventTypes.ANSWERING_PROMPT
    ) {
      handleNextTurn();
    }
  }, [players, handleNextTurn, currentEvent]);

  return (
    <Screen background={BackgroundImage}>
      <GameContainer>
        <PlayerList />

        {showPrompt && gameStart && !gameEnd && (
          <Prompt prompt={displayedPrompt} />
        )}
        {!showPrompt && gameStart && !gameEnd && (
          <DisplayResults prompt={displayedPrompt} />
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
