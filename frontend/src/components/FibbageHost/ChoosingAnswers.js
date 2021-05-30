import React, { useEffect } from 'react';

import PromptInfo from 'src/components/FibbagePromptInfo';
import { socket } from 'src/config';
import { usePlayers } from 'src/providers/fibbage/hooks';
import { shuffle } from 'src/utils/array';

import { DisplayContainer } from './index.styled';

const ChoosingAnswers = ({ prompt }) => {
  const players = usePlayers();

  const playerAnswers = players.map((player) => player.answer);
  const answers = shuffle([...playerAnswers, prompt.answer]);

  useEffect(() => {
    socket.emit('host/send/start-choosing', { answers });
    // eslint-disable-next-line
  }, []);

  return (
    <DisplayContainer>
      <PromptInfo prompt={prompt} hideTitle hideAdditionalInfo />
    </DisplayContainer>
  );
};

export default ChoosingAnswers;
