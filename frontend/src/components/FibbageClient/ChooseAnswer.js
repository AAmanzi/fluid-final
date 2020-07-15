import React, { useState } from "react";

import { PromptContainer, Button, ButtonAnswer } from "./index.styled";

const ChooseAnswer = ({ answers, onConfirm }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  return (
    <PromptContainer>
      {answers.map((answer) => (
        <ButtonAnswer
          onClick={() => setSelectedAnswer(answer)}
          isSelected={answer.playerId === selectedAnswer.playerId}
        >
          {answer.label}
        </ButtonAnswer>
      ))}

      <Button
        onClick={() => onConfirm(selectedAnswer.label)}
        disabled={!selectedAnswer}
      >
        Confirm
      </Button>
    </PromptContainer>
  );
};

export default ChooseAnswer;
