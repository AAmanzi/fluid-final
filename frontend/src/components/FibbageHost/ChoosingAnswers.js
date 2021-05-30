import React, { useEffect } from 'react';

import PromptInfo from 'src/components/FibbagePromptInfo';
import { socket } from 'src/config';
import { useCurrentPrompt, usePlayers } from 'src/providers/fibbage/hooks';
import { shuffle } from 'src/utils/array';

import { AnswersContainer, AnswerTag, DisplayContainer } from './index.styled';

const ChoosingAnswers = () => {
  const currentPrompt = useCurrentPrompt();
  const players = usePlayers();

  const playerAnswers = players.map((player) => player.answer);
  const answers = shuffle([...playerAnswers, currentPrompt.answer]);

  useEffect(() => {
    socket.emit('host/send/start-choosing', { answers });
    // eslint-disable-next-line
  }, []);

  return (
    <DisplayContainer>
      <PromptInfo prompt={currentPrompt} hideTitle hideDescription />
      <AnswersContainer>
        {answers.map((answer, index) => (
          <AnswerTag key={index}>{answer}</AnswerTag>
        ))}
      </AnswersContainer>
    </DisplayContainer>
  );
};

export default ChoosingAnswers;
