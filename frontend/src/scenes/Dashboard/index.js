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
  const [joinError, setJoinError] = useState(false);
  const [joinedRoomCode, setJoinedRoomCode] = useState(null);
  const [createdRoomCode, setCreatedRoomCode] = useState(null);

  useEffect(() => {
    socket.on('join/success', (code) => {
      setJoinedRoomCode(code);
    });

    return () => {
      socket.off('join/success');
    };
  }, []);

  useEffect(() => {
    socket.on('join/error', () => {
      setJoinError(true);
    });

    return () => {
      socket.off('join/error');
    };
  }, []);

  useEffect(() => {
    socket.on('create/success', (code) => {
      setCreatedRoomCode(code);
    });

    return () => {
      socket.off('create/success');
    };
  }, []);

  const joinGame = (username, roomCode) => {
    socket.emit('join', {
      roomCode,
      username,
      socketId: socket.id,
    });
  };

  const handleCreate = (type) => {
    socket.emit('create', {
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
        <SelectGameTypeScreen goBack={setMainScreen} onSelect={handleCreate} />
      );
    }

    return (
      <MainScreen
        setSelectGameTypeScreen={setSelectGameTypeScreen}
        joinGame={joinGame}
        joinError={joinError}
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
