import React, { useEffect } from 'react';

import { socket } from 'src/config';
import PromptInfo from 'src/components/FibbagePromptInfo';

import { PromptContainer } from './index.styled';

const AnsweringPrompt = ({ prompt }) => {
  useEffect(() => {
    socket.emit('host/send/start-answering', {
      prompt,
    });
    // eslint-disable-next-line
  }, []);

  return (
    <PromptContainer>
      <PromptInfo prompt={prompt} />
    </PromptContainer>
  );
};

export default AnsweringPrompt;
