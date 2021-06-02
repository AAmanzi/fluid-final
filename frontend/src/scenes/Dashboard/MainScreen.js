import React, { useState } from 'react';

import { ButtonSecondary, Input } from 'src/components/styled';

import { ButtonCreateGame, Label } from './index.styled';

const MainScreen = ({ setSelectGameTypeScreen, joinGame, error }) => {
  const [username, setUsername] = useState('');
  const [roomCode, setRoomCode] = useState('');

  const handleRoomCodeChange = (event) => {
    const newRoomCode = event.target.value.toUpperCase();

    if (newRoomCode.length <= 4) {
      setRoomCode(newRoomCode);
    }
  };

  const handleUsernameChange = (event) => {
    const newUsername = event.target.value.toUpperCase();

    if (newUsername.length <= 10) {
      setUsername(newUsername);
    }
  };

  const handleJoin = () => {
    if (username !== '' && roomCode !== '') {
      joinGame(username, roomCode);
    }
  };

  const handleJoinIfEnter = (e) => {
    if (e.key === 'Enter') {
      handleJoin();
    }
  };

  return (
    <>
      <ButtonCreateGame onClick={setSelectGameTypeScreen} content='CREATE GAME'>
        CREATE GAME
      </ButtonCreateGame>
      <div>
        <Label>Room code</Label>
        <Input
          value={roomCode}
          onChange={handleRoomCodeChange}
          placeholder='4-LETTER CODE'
        />
        {error && <p>{error}</p>}
      </div>
      <div>
        <Label>Name</Label>
        <Input
          value={username}
          onChange={handleUsernameChange}
          onKeyDown={handleJoinIfEnter}
          placeholder='YOUR NAME'
        />
      </div>
      <ButtonSecondary onClick={handleJoin}>JOIN GAME</ButtonSecondary>
    </>
  );
};

export default MainScreen;
