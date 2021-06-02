import React, { useEffect } from 'react';

import { socket } from 'src/config';
import { useFibbageContext } from 'src/providers/fibbage';
import PromptInfo from 'src/components/FibbagePromptInfo';

import { DisplayContainer } from './index.styled';

const AnsweringPrompt = () => {
  const {
    state: { currentPrompt },
  } = useFibbageContext();

  useEffect(() => {
    socket.emit('host/send/start-answering', {
      prompt: currentPrompt,
    });
  }, [currentPrompt]);

  return (
    <DisplayContainer>
      <PromptInfo prompt={currentPrompt} />
    </DisplayContainer>
  );
};

export default AnsweringPrompt;
