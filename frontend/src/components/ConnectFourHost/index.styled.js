import { PLAYER } from 'src/consts/enums';
import styled from 'styled-components';

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
  position: relative;
`;

export const GameContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: flex-start;
  width: 100vw;
  height: 100vh;
  background-color: transparent;
`;

export const NotStartedContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const BoardContainer = styled.div`
  display: flex;
  align-self: center;
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

export const PlayerListContainer = styled.div`
  margin: 20px;
`;

export const PlayerContainer = styled.div`
  border-radius: 40px;
  margin-bottom: 5px;
  background-color: white;
  padding: 6px 14px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: fit-content;
  border: 4px solid white;

  ${({ value, active }) => active && `border-color: ${getPlayerColor(value)};`}
`;

export const PlayerChip = styled.div`
  border-radius: 50%;
  width: 38px;
  height: 38px;
  margin-right: 6px;
  opacity: 0.6;

  ${({ value }) => `background-color: ${getPlayerColor(value)};`}
  ${({ active }) => active && 'opacity: 1;'}
`;

export const PlayerScore = styled.p`
  text-align: left;
`;
