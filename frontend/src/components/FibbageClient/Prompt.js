import React, { useState } from 'react';

import PromptInfo from 'src/components/FibbagePromptInfo';
import { ButtonSecondary, Input } from 'src/components/styled';

import { PromptContainer } from './index.styled';

const Prompt = ({ prompt, onConfirm }) => {
  const [answer, setAnswer] = useState('');

  return (
    <PromptContainer>
      <div>
        <PromptInfo prompt={prompt} hideTitle={true} hideDescription={true} />
      </div>

      <Input
        type='text'
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />

      <ButtonSecondary
        color='red'
        onClick={() => onConfirm(answer)}
        disabled={!answer}>
        Confirm
      </ButtonSecondary>
    </PromptContainer>
  );
};

export default Prompt;
