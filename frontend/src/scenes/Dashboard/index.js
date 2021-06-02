import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router';

import { socket } from 'src/config';
import LogoIcon from 'src/assets/logo.svg';

import MainScreen from './MainScreen';
import SelectGameTypeScreen from './SelectGameTypeScreen';
import { DashboardContainer, Logo, Container } from './index.styled';

const SCREEN = Object.freeze({
  main: 'main',
  selectGameType: 'selectGameType',
});

const StartScreen = () => {
  const [screen, setScreen] = useState(SCREEN.main);
  const [error, setError] = useState(null);
  const [joinedRoomCode, setJoinedRoomCode] = useState(null);
  const [createdRoomCode, setCreatedRoomCode] = useState(null);

  useEffect(() => {
    socket.on('client/receive/join-success', ({ roomCode }) => {
      setJoinedRoomCode(roomCode);
    });

    return () => {
      socket.off('client/receive/join-success');
    };
  }, []);

  useEffect(() => {
    socket.on('client/receive/join-error', ({ message }) => {
      setError(message);
    });

    return () => {
      socket.off('client/receive/invalid-room-code');
    };
  }, []);

  useEffect(() => {
    socket.on('host/receive/room-create-success', ({ roomCode }) => {
      setCreatedRoomCode(roomCode);
    });

    return () => {
      socket.off('host/receive/room-create-success');
    };
  }, []);

  const joinGame = (username, roomCode) => {
    socket.emit('client/send/join', {
      roomCode,
      username,
      socketId: socket.id,
    });
  };

  const handleCreateGame = (type) => {
    socket.emit('host/send/create', {
      socketId: socket.id,
      type,
    });
  };

  if (createdRoomCode) {
    return <Redirect to={`/host/${createdRoomCode}`} />;
  }

  if (joinedRoomCode) {
    return <Redirect to={`/room/${joinedRoomCode}`} />;
  }

  const setSelectGameTypeScreen = () => {
    setScreen(SCREEN.selectGameType);
  };

  const setMainScreen = () => {
    setScreen(SCREEN.main);
  };

  const getContent = () => {
    if (screen === SCREEN.selectGameType) {
      return (
        <SelectGameTypeScreen
          goBack={setMainScreen}
          createGame={handleCreateGame}
        />
      );
    }

    return (
      <MainScreen
        setSelectGameTypeScreen={setSelectGameTypeScreen}
        joinGame={joinGame}
        error={error}
      />
    );
  };

  return (
    <DashboardContainer>
      <Container>
        {getContent()}
        <Logo src={LogoIcon} alt='Fluid' />
      </Container>
    </DashboardContainer>
  );
};

export default StartScreen;
