import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router';

import { socket } from 'src/config';
import LogoIcon from 'src/assets/logo.svg';

import MainScreen from './MainScreen';
import SelectGameTypeScreen from './SelectGameTypeScreen';
import { DashboardContainer, Logo, Container } from './index.styled';

const Screen = Object.freeze({
  main: 'main',
  selectGameType: 'selectGameType',
});

const StartScreen = () => {
  const [screen, setScreen] = useState(Screen.main);
  const [error, setError] = useState(null);
  const [joinedRoomCode, setJoinedRoomCode] = useState(null);
  const [createdRoomCode, setCreatedRoomCode] = useState(null);
  const [roomType, setRoomType] = useState(null);

  useEffect(() => {
    socket.on('client/receive/join-success', ({ roomCode, roomType }) => {
      setJoinedRoomCode(roomCode);
      setRoomType(roomType);
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
    setRoomType(type);
    socket.emit('host/send/create', {
      socketId: socket.id,
      type,
    });
  };

  if (createdRoomCode && roomType) {
    return <Redirect to={`/host/${roomType}/${createdRoomCode}`} />;
  }

  if (joinedRoomCode && roomType) {
    return <Redirect to={`/room/${roomType}/${joinedRoomCode}`} />;
  }

  const setSelectGameTypeScreen = () => {
    setScreen(Screen.selectGameType);
  };

  const setMainScreen = () => {
    setScreen(Screen.main);
  };

  const getContent = () => {
    if (screen === Screen.selectGameType) {
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
