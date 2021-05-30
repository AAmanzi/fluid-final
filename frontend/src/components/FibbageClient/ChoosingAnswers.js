import React, { useState } from 'react';

import { socket } from 'src/config';
import { ButtonRadio, ButtonSecondary } from 'src/components/styled';

import { PromptContainer } from './index.styled';

const ChoosingAnswers = ({ answers, onConfirm }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleConfirm = () => {
    socket.emit('client/send/choice', { selectedAnswer, socketId: socket.id });
    onConfirm();
  };

  return (
    <PromptContainer>
      {answers.map((answer) => (
        <ButtonRadio
          onClick={() => setSelectedAnswer(answer)}
          isSelected={answer === selectedAnswer}>
          {answer}
        </ButtonRadio>
      ))}

      <ButtonSecondary
        background='red'
        onClick={handleConfirm}
        disabled={!selectedAnswer}>
        Confirm
      </ButtonSecondary>
    </PromptContainer>
  );
};

export default ChoosingAnswers;
