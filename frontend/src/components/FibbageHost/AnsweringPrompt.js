import React, { useEffect } from 'react';

import { socket } from 'src/config';
import { useCurrentPrompt } from 'src/providers/fibbage/hooks';
import PromptInfo from 'src/components/FibbagePromptInfo';

import { PromptContainer } from './index.styled';

const AnsweringPrompt = () => {
  const currentPrompt = useCurrentPrompt();

  useEffect(() => {
    socket.emit('host/send/start-answering', {
      prompt: currentPrompt,
    });
  }, [currentPrompt]);

  return (
    <PromptContainer>
      <PromptInfo prompt={currentPrompt} />
    </PromptContainer>
  );
};

export default AnsweringPrompt;
