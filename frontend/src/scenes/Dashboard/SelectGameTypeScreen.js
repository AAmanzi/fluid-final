import React from 'react';

import { ROOM_TYPE } from 'src/consts/enums';

import { ButtonSecondary, ButtonPrimary } from './index.styled';

const SelectGameTypeScreen = ({ goBack, onSelect }) => {
  const handleSelectType = (type) => {
    onSelect(type);
  };

  return (
    <>
      {Object.values(ROOM_TYPE).map((type) => (
        <ButtonPrimary key={type} onClick={handleSelectType} content={type}>
          {type}
        </ButtonPrimary>
      ))}
      <ButtonSecondary>Back</ButtonSecondary>
    </>
  );
};

export default SelectGameTypeScreen;
