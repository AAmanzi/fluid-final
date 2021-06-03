import React, { useState } from 'react';

import { socket } from 'src/config';
import PromptInfo from 'src/components/FibbagePromptInfo';
import { ButtonSecondary, Input } from 'src/components/styled';

import { PromptContainer } from './index.styled';

const AnsweringPrompt = ({ prompt, onConfirm }) => {
  const [answer, setAnswer] = useState('');

  const handleConfirm = () => {
    socket.emit('client/send/answer', { answer, socketId: socket.id });
    onConfirm();
  };

  return (
    <PromptContainer>
      <PromptInfo prompt={prompt} hideTitle />
      <Input
        type='text'
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      <ButtonSecondary color='red' onClick={handleConfirm} disabled={!answer}>
        Confirm
      </ButtonSecondary>
    </PromptContainer>
  );
};

export default AnsweringPrompt;
