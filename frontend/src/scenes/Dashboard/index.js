import React, { useState, useEffect } from "react";
import { Redirect } from "react-router";

import useSocket from "services/socket/useSocket";

import LogoIcon from "assets/logo.svg";
import BackgroundImage from "assets/background.png";

import {
  DashboardContainer,
  Logo,
  ButtonCreate,
  ButtonJoin,
  Label,
  Input,
  Container,
} from "./index.styled";

const StartScreen = () => {
  const [joinError, setJoinError] = useState(false);
  const [joinSuccess, setJoinSuccess] = useState(false);
  const [username, setUsername] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [createdRoomCode, setCreatedRoomCode] = useState(null);
  const socket = useSocket();

  useEffect(() => {
    socket.on("join/success", () => {
      setJoinSuccess(true);
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    socket.on("join/error", () => {
      setJoinError(true);
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    socket.on("create/success", (code) => {
      setCreatedRoomCode(code);
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    return () =>
      socket.removeAllListeners([
        "join/success",
        "join/error",
        "create/success",
      ]);
    // eslint-disable-next-line
  }, []);

  const handleJoin = () => {
    socket.emit("join", {
      roomCode,
      username,
      socketId: socket.id,
    });
  };

  const handleRoomSelect = (value) => {
    socket.emit("create", {
      socketId: socket.id,
      type: value,
    });
  };

  const handleSetRoomCode = (e) => {
    const newRoomCode = e.target.value.toUpperCase();

    if (newRoomCode.length <= 4) {
      setRoomCode(newRoomCode);
    }
  };

  const handleSetUsername = (e) => {
    const newUsername = e.target.value.toUpperCase();

    if (newUsername.length <= 10) {
      setUsername(newUsername);
    }
  };

  const handleJoinIfEnter = (e) => {
    if (e.key === "Enter") {
      handleJoin();
    }
  };

  if (createdRoomCode) {
    return <Redirect to={`/host/${createdRoomCode}`} />;
  }

  if (joinSuccess) {
    return <Redirect to={`/room/${roomCode}`} />;
  }

  return (
    <DashboardContainer background={BackgroundImage}>
      <Container>
        <ButtonCreate
          onClick={() => handleRoomSelect("FIBBAGE")}
          content="CREATE GAME"
        >
          CREATE GAME
        </ButtonCreate>
        <div>
          <Label>Room code</Label>
          <Input
            value={roomCode}
            onChange={handleSetRoomCode}
            placeholder="4-LETTER CODE"
          />
          {joinError && <p>Invalid room code!</p>}
        </div>
        <div>
          <Label>Name</Label>
          <Input
            value={username}
            onChange={handleSetUsername}
            onKeyDown={handleJoinIfEnter}
            placeholder="YOUR NAME"
          />
        </div>
        <ButtonJoin onClick={handleJoin}>PLAY</ButtonJoin>
      </Container>
      <Logo src={LogoIcon} alt="Fluid" />
    </DashboardContainer>
  );
};

export default StartScreen;
