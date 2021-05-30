import React, { useState } from 'react';

import { ButtonPrimary, ButtonSecondary, Label, Input } from './index.styled';

const MainScreen = ({ setSelectGameTypeScreen, joinGame, joinError }) => {
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
      <ButtonPrimary onClick={setSelectGameTypeScreen} content='CREATE GAME'>
        CREATE GAME
      </ButtonPrimary>
      <div>
        <Label>Room code</Label>
        <Input
          value={roomCode}
          onChange={handleRoomCodeChange}
          placeholder='4-LETTER CODE'
        />
        {joinError && <p>Invalid room code!</p>}
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
      <ButtonSecondary onClick={handleJoin}>PLAY</ButtonSecondary>
    </>
  );
};

export default MainScreen;
