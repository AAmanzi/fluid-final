import React, { useEffect } from 'react';

import { socket } from 'src/config';
import { shuffle } from 'src/utils/array';
import { useFibbageContext } from 'src/providers/fibbage';
import PromptInfo from 'src/components/FibbagePromptInfo';

import {
  AnswersContainer,
  AnswerTagContainer,
  AnswerTagValue,
  DisplayContainer,
} from './index.styled';

const ChoosingAnswers = () => {
  const {
    state: { players, currentPrompt },
  } = useFibbageContext();

  const playerAnswers = players.map((player) => ({
    playerId: player.socketId,
    value: player.answer,
  }));
  const answers = shuffle([
    ...playerAnswers,
    {
      playerId: 'correct',
      value: currentPrompt.answer,
    },
  ]);

  useEffect(() => {
    socket.emit('host/send/start-choosing', { answers });
    // eslint-disable-next-line
  }, []);

  return (
    <DisplayContainer>
      <PromptInfo prompt={currentPrompt} hideTitle hideDescription />
      <AnswersContainer>
        {answers.map((answer, index) => (
          <AnswerTagContainer key={index}>
            <AnswerTagValue>{answer.value}</AnswerTagValue>
          </AnswerTagContainer>
        ))}
      </AnswersContainer>
    </DisplayContainer>
  );
};

export default ChoosingAnswers;
