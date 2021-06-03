import React from 'react';

import { ROOM_TYPE } from 'src/consts/enums';
import {
  ButtonSecondary,
  ButtonPrimary,
  TextSecondary,
} from 'src/components/styled';

const SelectGameTypeScreen = ({ goBack, createGame }) => {
  return (
    <>
      <TextSecondary>Select game type:</TextSecondary>
      <div>
        {Object.values(ROOM_TYPE).map((type) => (
          <ButtonPrimary
            key={type}
            onClick={() => createGame(type)}
            content={type}>
            {type}
          </ButtonPrimary>
        ))}
      </div>
      <ButtonSecondary onClick={goBack}>Back</ButtonSecondary>
    </>
  );
};

export default SelectGameTypeScreen;
