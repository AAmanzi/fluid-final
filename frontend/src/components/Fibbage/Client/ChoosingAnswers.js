import React, { useState } from 'react';

import { socket } from 'src/config';
import { ButtonRadio, ButtonSecondary } from 'src/components/styled';

import { ChoosingAnswersButtonWrapper, PromptContainer } from './index.styled';

const ChoosingAnswers = ({ answers, onConfirm }) => {
  const [choice, setChoice] = useState(null);

  const handleConfirm = () => {
    socket.emit('client/send/choice', {
      choice,
      socketId: socket.id,
    });
    onConfirm();
  };

  const getIsSelected = (answer) => {
    if (choice === null) {
      return false;
    }

    return answer.playerId === choice.playerId && answer.value === choice.value;
  };

  return (
    <PromptContainer>
      <ChoosingAnswersButtonWrapper>
        {answers.map((answer) => (
          <ButtonRadio
            key={answer.playerId}
            onClick={() => setChoice(answer)}
            isSelected={getIsSelected(answer)}>
            {answer.value}
          </ButtonRadio>
        ))}
      </ChoosingAnswersButtonWrapper>

      <ButtonSecondary
        background='red'
        onClick={handleConfirm}
        disabled={!choice}>
        Confirm
      </ButtonSecondary>
    </PromptContainer>
  );
};

export default ChoosingAnswers;
