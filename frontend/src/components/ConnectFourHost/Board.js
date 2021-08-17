import React, { useEffect } from 'react';
import { socket } from 'src/config';
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
  } = useConnectFourContext();

  useEffect(() => {
    socket.emit('host/send/update-board', { board });
  }, [board]);

  return (
    <BoardContainer>
      {board.map((column, columnIndex) => (
        <BoardColumnContainer key={columnIndex}>
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
