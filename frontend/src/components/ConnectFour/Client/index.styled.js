import styled from 'styled-components';

import { PLAYER } from 'src/consts/enums';

const playerOneColor = '#ee5d6c';
const playerTwoColor = '#282856';

const getPlayerColor = (player) => {
  return player === PLAYER.one ? playerOneColor : playerTwoColor;
};

export const Screen = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const GameContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
`;

export const BoardContainer = styled.div`
  display: flex;
`;

export const BoardColumnContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
`;

export const BoardCellContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 100px;
  height: 100px;
  border: 1px solid black;
`;

export const BoardCellChip = styled.div`
  width: 75px;
  height: 75px;
  border-radius: 50%;

  ${({ value }) => `background-color: ${getPlayerColor(value)};`}
`;
