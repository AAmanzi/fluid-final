import React, { useCallback, useEffect, useState } from 'react';

import { groupBy, shuffle } from 'src/utils/array';
import { useFibbageContext } from 'src/providers/fibbage';
import PromptInfo from 'src/components/Fibbage/PromptInfo';

import AnswerTag from './AnswerTag';
import { AnswersContainer, DisplayContainer } from './index.styled';

const DisplayResults = ({ onEnd }) => {
  const {
    state: { players, currentPrompt },
  } = useFibbageContext();

  const [currentFocusedChoiceIndex, setCurrentFocusedChoiceIndex] = useState(0);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);

  const playerChoices = players.map((player) => ({
    playerId: player.socketId,
    choiceValue: player.choice?.value,
    choicePlayerId: player.choice?.playerId,
  }));
  const choicesByPlayer = groupBy(playerChoices, 'choicePlayerId');

  const orderedKeys = Object.keys(choicesByPlayer).sort((curr, next) => {
    if (curr === 'correct') {
      return 1;
    }

    if (next === 'correct') {
      return -1;
    }

    return choicesByPlayer[curr].length - choicesByPlayer[next].length;
  });

  const correctAnswer = {
    socketId: 'correct',
    answer: currentPrompt.answer,
  };

  const answers = [...players, correctAnswer].map((answer) => ({
    playerId: answer.socketId,
    value: answer.answer,
    playerIdsSelected: choicesByPlayer[answer.socketId]?.map(
      (choice) => choice.playerId
    ),
  }));

  useEffect(() => {
    if (!shuffledAnswers.length) {
      setShuffledAnswers(shuffle(answers));
    }
  }, [answers, shuffledAnswers]);

  const getShouldStartDisplayingResults = (answer) => {
    const currentFocusedKey = orderedKeys[currentFocusedChoiceIndex];

    return answer.playerId === currentFocusedKey;
  };

  const getNextFocusedChoiceIndex = useCallback(() => {
    setCurrentFocusedChoiceIndex((prev) => {
      if (prev < orderedKeys.length - 1) {
        return prev + 1;
      }

      onEnd();

      return prev;
    });
  }, [orderedKeys.length, onEnd]);

  return (
    <DisplayContainer>
      <PromptInfo prompt={currentPrompt} hideTitle />
      <AnswersContainer>
        {shuffledAnswers.map((answer) => (
          <AnswerTag
            key={answer.playerId}
            value={answer.value}
            playerIdsSelected={answer.playerIdsSelected}
            shouldStartDisplayingResults={getShouldStartDisplayingResults(
              answer
            )}
            onEnd={getNextFocusedChoiceIndex}
          />
        ))}
      </AnswersContainer>
    </DisplayContainer>
  );
};

export default DisplayResults;
