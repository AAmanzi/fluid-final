import React from 'react';
import { useConnectFourContext } from 'src/providers/connectFour';
import {
  BoardCellChip,
  BoardCellContainer,
  BoardContainer,
  BoardColumnContainer,
} from './index.styled';

const Board = () => {
  const {
    state: { board },
    dropCoin,
  } = useConnectFourContext();

  const handleDropCoin = (columnIndex) => {
    dropCoin(columnIndex);
  };

  return (
    <BoardContainer>
      {board.map((column, columnIndex) => (
        <BoardColumnContainer
          key={columnIndex}
          onClick={() => handleDropCoin(columnIndex)}>
          {column.map((cell, rowIndex) => (
            <BoardCellContainer key={rowIndex}>
              {cell !== null && <BoardCellChip value={cell} />}
            </BoardCellContainer>
          ))}
        </BoardColumnContainer>
      ))}
    </BoardContainer>
  );
};

export default Board;
