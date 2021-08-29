import React from 'react';
import { socket } from 'src/config';
import { Text } from '../../styled';

import {
  BoardCellChip,
  BoardCellContainer,
  BoardContainer,
  BoardColumnContainer,
} from './index.styled';

const Board = ({ board, isPlaying, onAfterDropCoin }) => {
  const handleDropCoin = (columnIndex) => {
    if (isPlaying) {
      socket.emit('client/send/drop-coin', { columnIndex });

      onAfterDropCoin();
    }
  };

  return (
    <>
      <Text>{isPlaying ? 'Your turn to play' : 'Waiting for other player'}</Text>

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
    </>
  );
};

export default Board;
