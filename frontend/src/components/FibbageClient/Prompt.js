import React, { useState } from 'react';

import PromptInfo from 'src/components/FibbagePromptInfo';

import { PromptContainer, Input, Button } from './index.styled';

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

      <Button onClick={() => onConfirm(answer)} disabled={!answer}>
        Confirm
      </Button>
    </PromptContainer>
  );
};

export default Prompt;
