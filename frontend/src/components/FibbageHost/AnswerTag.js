import React, { useEffect, useState } from 'react';
import { usePlayers } from 'src/providers/fibbage/hooks';
import { wait } from 'src/utils/wait';

import {
  AnswerTagContainer,
  AnswerTagContainerAbsolute,
  AnswerTagPlayersContainer,
  AnswerTagPlayerTag,
  AnswerTagPoint,
  AnswerTagPointsContainer,
  AnswerTagValue,
} from './index.styled';

const EVENT = Object.freeze({
  onlyValue: 'onlyValue',
  focusedResults: 'focusedResults',
  valueAndResults: 'valueAndResults',
});

const INITIAL_DELAY = 2000;
const PLAYER_DELAY = 500;

const AnswerTag = ({
  value,
  playerIdsSelected,
  shouldStartDisplayingResults,
  onEnd,
}) => {
  const players = usePlayers();
  const [event, setEvent] = useState(EVENT.onlyValue);

  const disappearsIn =
    PLAYER_DELAY * (playerIdsSelected?.length || 0) + INITIAL_DELAY;

  useEffect(() => {
    const handleDisplays = async () => {
      if (shouldStartDisplayingResults) {
        await wait(INITIAL_DELAY);
        setEvent(EVENT.focusedResults);

        await wait(disappearsIn + INITIAL_DELAY / 2);
        setEvent(EVENT.valueAndResults);
      }
    };

    handleDisplays();
  }, [shouldStartDisplayingResults, playerIdsSelected, disappearsIn]);

  useEffect(() => {
    if (event === EVENT.valueAndResults) {
      onEnd();
    }
  }, [event, onEnd]);

  const playerNamesSelected = playerIdsSelected?.map((playerId) =>
    players.find((player) => player.socketId === playerId)
  );

  const getContent = () => {
    if (event === EVENT.focusedResults) {
      return (
        <AnswerTagContainerAbsolute disappearsIn={disappearsIn}>
          <AnswerTagValue>{value}</AnswerTagValue>
          <AnswerTagPlayersContainer>
            {playerNamesSelected.map((player, index) => (
              <AnswerTagPlayerTag
                key={player.socketId}
                delay={PLAYER_DELAY * (index + 1)}>
                {player.name}
              </AnswerTagPlayerTag>
            ))}
          </AnswerTagPlayersContainer>
        </AnswerTagContainerAbsolute>
      );
    }

    if (event === EVENT.valueAndResults) {
      return (
        <AnswerTagPointsContainer>
          {playerNamesSelected.map((_, index) => (
            <AnswerTagPoint key={index} />
          ))}
        </AnswerTagPointsContainer>
      );
    }
  };

  return (
    <AnswerTagContainer>
      <AnswerTagValue>{value}</AnswerTagValue>
      {getContent()}
    </AnswerTagContainer>
  );
};

export default AnswerTag;
