import React, { useEffect } from 'react';

import { socket } from 'src/config';
import PromptInfo from 'src/components/FibbagePromptInfo';

import { PromptContainer } from './index.styled';

const Prompt = ({ prompt }) => {
  useEffect(() => {
    socket.emit('host/send/prompt', {
      prompt,
    });
    // eslint-disable-next-line
  }, []);

  return (
    <PromptContainer>
      <div>
        <PromptInfo prompt={prompt} />
      </div>
    </PromptContainer>
  );
};

export default Prompt;
