import React, { useState } from 'react';
import { ButtonRadio, ButtonSecondary } from '../styled';

import { PromptContainer } from './index.styled';

const ChooseAnswer = ({ answers, onConfirm }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  return (
    <PromptContainer>
      {answers.map((answer) => (
        <ButtonRadio
          onClick={() => setSelectedAnswer(answer)}
          isSelected={answer.playerId === selectedAnswer.playerId}>
          {answer.label}
        </ButtonRadio>
      ))}

      <ButtonSecondary
        background='red'
        onClick={() => onConfirm(selectedAnswer.label)}
        disabled={!selectedAnswer}>
        Confirm
      </ButtonSecondary>
    </PromptContainer>
  );
};

export default ChooseAnswer;
