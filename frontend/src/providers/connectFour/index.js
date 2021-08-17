import React, { useContext, useReducer } from 'react';

import { CONNECT_FOUR_EVENT_TYPE, PLAYER } from 'src/consts/enums';
import { constructNewBoard, getIsWin } from './utils';

const initialState = {
  playerOne: null,
  playerTwo: null,
  board: constructNewBoard(),
  currentEvent: CONNECT_FOUR_EVENT_TYPE.notStarted,
  playerToStartGame: PLAYER.one,
};

const actionType = Object.freeze({
  ADD_PLAYER: 'ADD_PLAYER',
  REMOVE_PLAYER: 'REMOVE_PLAYER',
  HANDLE_START_GAME: 'HANDLE_START_GAME',
  HANDLE_DROP_COIN: 'HANDLE_DROP_COIN',
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.ADD_PLAYER:
      if (state.playerOne === null) {
        return {
          ...state,
          playerOne: action.player,
        };
      }

      if (state.playerTwo === null) {
        return {
          ...state,
          playerTwo: action.player,
        };
      }

      return { ...state };
    case actionType.REMOVE_PLAYER:
      if (state.playerOne?.socketId === action.socketId) {
        return {
          ...state,
          playerOne: null,
        };
      }

      if (state.playerTwo?.socketId === action.socketId) {
        return {
          ...state,
          playerTwo: null,
        };
      }

      return { ...state };
    case actionType.HANDLE_START_GAME:
      const eventAfterStartGame =
        state.playerToStartGame === PLAYER.one
          ? CONNECT_FOUR_EVENT_TYPE.playerOneTurn
          : CONNECT_FOUR_EVENT_TYPE.playerTwoTurn;
      const playerToStartGameAfterStartGame =
        state.playerToStartGame === PLAYER.one ? PLAYER.two : PLAYER.one;

      return {
        ...state,
        board: constructNewBoard(),
        currentEvent: eventAfterStartGame,
        playerToStartGame: playerToStartGameAfterStartGame,
      };
    case actionType.HANDLE_DROP_COIN:
      if (
        ![
          CONNECT_FOUR_EVENT_TYPE.playerOneTurn,
          CONNECT_FOUR_EVENT_TYPE.playerTwoTurn,
        ].includes(state.currentEvent)
      ) {
        return { ...state };
      }

      const rowIndex = state.board[action.columnIndex].findIndex(
        (cell) => cell === null
      );

      if (rowIndex === -1) {
        return { ...state };
      }

      const boardAfterDropCoin = state.board.map((column) => [...column]);
      const playerThatDropppedCoin =
        state.currentEvent === CONNECT_FOUR_EVENT_TYPE.playerOneTurn
          ? PLAYER.one
          : PLAYER.two;

      boardAfterDropCoin[action.columnIndex][rowIndex] = playerThatDropppedCoin;

      const isWin = getIsWin(
        boardAfterDropCoin,
        action.columnIndex,
        rowIndex,
        playerThatDropppedCoin
      );

      if (isWin) {
        const playerOneAfterWin =
          playerThatDropppedCoin === PLAYER.one
            ? { ...state.playerOne, score: state.playerOne.score + 1 }
            : { ...state.playerOne };
        const playerTwoAfterWin =
          playerThatDropppedCoin === PLAYER.two
            ? { ...state.playerTwo, score: state.playerTwo.score + 1 }
            : { ...state.playerTwo };

        return {
          ...state,
          board: boardAfterDropCoin,
          playerOne: playerOneAfterWin,
          playerTwo: playerTwoAfterWin,
          currentEvent: CONNECT_FOUR_EVENT_TYPE.gameOver,
        };
      }

      const eventAfterDropCoin =
        state.currentEvent === CONNECT_FOUR_EVENT_TYPE.playerOneTurn
          ? CONNECT_FOUR_EVENT_TYPE.playerTwoTurn
          : CONNECT_FOUR_EVENT_TYPE.playerOneTurn;

      return {
        ...state,
        board: boardAfterDropCoin,
        currentEvent: eventAfterDropCoin,
      };
    default:
      return { ...state };
  }
};

const ConnectFourContext = React.createContext({
  state: { ...initialState },
  addPlayer: () => {},
  removePlayer: () => {},
  startGame: () => {},
  dropCoin: () => {},
});

const ConnectFourProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addPlayer = (player) => {
    dispatch({
      type: actionType.ADD_PLAYER,
      player: {
        ...player,
        score: 0,
      },
    });
  };

  const removePlayer = (socketId) => {
    dispatch({ type: actionType.REMOVE_PLAYER, socketId });
  };

  const startGame = () => {
    dispatch({ type: actionType.HANDLE_START_GAME });
  };

  const dropCoin = (columnIndex) => {
    dispatch({ type: actionType.HANDLE_DROP_COIN, columnIndex });
  };

  const value = {
    state,
    addPlayer,
    removePlayer,
    startGame,
    dropCoin,
  };

  return (
    <ConnectFourContext.Provider value={value}>
      {children}
    </ConnectFourContext.Provider>
  );
};

export default ConnectFourProvider;

export const useConnectFourContext = () => useContext(ConnectFourContext);
