import React from 'react';

import { ROOM_TYPE } from 'src/consts/enums';
import { ButtonSecondary, ButtonPrimary } from 'src/components/styled';

const SelectGameTypeScreen = ({ goBack, createGame }) => {
  return (
    <>
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
