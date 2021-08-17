import { connectFourConfig } from 'src/config';

export const constructNewBoard = () => {
  return new Array(connectFourConfig.boardSize.columns).fill(
    new Array(connectFourConfig.boardSize.rows).fill(null)
  );
};

const CAP = 5;

const getIsWinFromOrderedArray = (array, player) => {
  if (array.length < CAP) {
    return false;
  }

  let counter = 0;
  let isWin = false;

  array.forEach((cell) => {
    if (cell === player) {
      counter++;

      if (counter === CAP) {
        isWin = true;

        return;
      }
    } else {
      counter = 0;
    }
  });

  return isWin;
};

const getIsVerticalWin = (board, columnIndex, player) => {
  const column = board[columnIndex];

  return getIsWinFromOrderedArray(column, player);
};

const getIsHorizontalWin = (board, rowIndex, player) => {
  const row = board.map((column) => column[rowIndex]);

  return getIsWinFromOrderedArray(row, player);
};

const getIsAscendingDiagonalWin = (board, columnIndex, rowIndex, player) => {
  let current = {
    column: columnIndex,
    cell: rowIndex,
  };

  while (board[current.column - 1]?.[current.cell - 1] !== undefined) {
    current.column--;
    current.cell--;
  }

  const diagonal = [];

  while (board[current.column]?.[current.cell] !== undefined) {
    diagonal.push(board[current.column][current.cell]);

    current.column++;
    current.cell++;
  }

  return getIsWinFromOrderedArray(diagonal, player);
};

const getIsDescendingDiagonalWin = (board, columnIndex, rowIndex, player) => {
  let current = {
    column: columnIndex,
    cell: rowIndex,
  };

  while (board[current.column - 1]?.[current.cell + 1] !== undefined) {
    current.column--;
    current.cell++;
  }

  const diagonal = [];

  while (board[current.column]?.[current.cell] !== undefined) {
    diagonal.push(board[current.column][current.cell]);

    current.column++;
    current.cell--;
  }

  return getIsWinFromOrderedArray(diagonal, player);
};

export const getIsWin = (board, columnIndex, rowIndex, player) => {
  const isVerticalWin = getIsVerticalWin(board, columnIndex, player);
  const isHorizontalWin = getIsHorizontalWin(board, rowIndex, player);
  const isAscendingDiagonalWin = getIsAscendingDiagonalWin(
    board,
    columnIndex,
    rowIndex,
    player
  );
  const isDescendingDiagonalWin = getIsDescendingDiagonalWin(
    board,
    columnIndex,
    rowIndex,
    player
  );

  return (
    isVerticalWin ||
    isHorizontalWin ||
    isAscendingDiagonalWin ||
    isDescendingDiagonalWin
  );
};
