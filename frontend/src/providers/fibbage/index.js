import React, { useReducer } from 'react';

import { playersDevMode, promptsDevMode } from 'src/config';
import { FIBBAGE_EVENT_TYPE } from 'src/consts/enums';

import devPrompts from './_prompts.const';
import prodPrompts from './prompts.const';
import devPlayers from './_players.const';

const initialPlayers = playersDevMode ? devPlayers : [];
const initialPrompts = promptsDevMode ? devPrompts : prodPrompts;

const initialState = {
  players: initialPlayers,
  prompts: initialPrompts,

  currentPrompt: null,
  currentEvent: null,

  gameStart: false,
  gameEnd: false,
};

const actionType = {
  ADD_PLAYER: 'ADD_PLAYER',
  REMOVE_PLAYER: 'REMOVE_PLAYER',
  START_GAME: 'START_GAME',
  HANDLE_NEXT_TURN: 'HANDLE_NEXT_TURN',
  GET_NEW_PROMPT: 'GET_NEW_PROMPT',
  SET_PLAYER_ANSWER: 'SET_PLAYER_ANSWER',
  SET_PLAYER_CHOICE: 'SET_PLAYER_CHOICE',
};

const reducer = (state = initialState, action) => {
  const prevPlayers = [...state.players];
  const prevEvent = { ...state }.currentEvent;

  switch (action.type) {
    case actionType.ADD_PLAYER:
      const alreadyExists = state.players?.some(
        (player) => player.socketId === action.player.socketId
      );

      if (alreadyExists) {
        return { ...state };
      }

      return {
        ...state,
        players: [...state.players, action.player],
      };
    case actionType.REMOVE_PLAYER:
      const newPlayersRemove = prevPlayers.filter(
        (player) => player.socketId !== action.socketId
      );

      return {
        ...state,
        players: newPlayersRemove,
      };
    case actionType.START_GAME:
      return {
        ...state,
        gameStart: true,
      };
    case actionType.HANDLE_NEXT_TURN:
      const shouldDrawNewPrompt =
        prevEvent === null || prevEvent === FIBBAGE_EVENT_TYPE.displayResults;

      const getNewEventType = () => {
        if (prevEvent === FIBBAGE_EVENT_TYPE.answeringPrompt) {
          return FIBBAGE_EVENT_TYPE.choosingAnswers;
        }

        if (prevEvent === FIBBAGE_EVENT_TYPE.choosingAnswers) {
          return FIBBAGE_EVENT_TYPE.displayResults;
        }

        if (prevEvent === FIBBAGE_EVENT_TYPE.displayResults) {
          return FIBBAGE_EVENT_TYPE.answeringPrompt;
        }

        return FIBBAGE_EVENT_TYPE.answeringPrompt;
      };

      const newEventType = getNewEventType();

      const newPlayersNextTurn = shouldDrawNewPrompt
        ? prevPlayers.map((player) => ({
            ...player,
            answer: null,
            choice: null,
          }))
        : prevPlayers.map((player) => ({ ...player }));

      if (!shouldDrawNewPrompt) {
        return {
          ...state,
          currentEvent: newEventType,
          players: newPlayersNextTurn,
        };
      }

      const newPromptIndex = Math.floor(Math.random() * state.prompts.length);
      const newPrompt = { ...state.prompts[newPromptIndex] };

      return {
        ...state,
        currentEvent: newEventType,
        players: newPlayersNextTurn,
        currentPrompt: newPrompt,
        prompts: state.prompts.filter((_, index) => index !== newPromptIndex),
      };
    case actionType.SET_PLAYER_ANSWER:
      const newPlayersAnswer = [...prevPlayers];

      const playerToEditAnswer = newPlayersAnswer.find(
        (player) => player.socketId === action.socketId
      );

      playerToEditAnswer.answer = action.answer;

      return {
        ...state,
        players: newPlayersAnswer,
      };
    case actionType.SET_PLAYER_CHOICE:
      const newPlayersChoice = [...prevPlayers];

      const playerToEditChoice = newPlayersChoice.find(
        (player) => player.socketId === action.socketId
      );

      playerToEditChoice.choice = action.choice;

      return {
        ...state,
        players: newPlayersChoice,
      };
    default:
      return { ...state };
  }
};

export const FibbageContext = React.createContext({
  state: { ...initialState },
  addPlayer: () => {},
  removePlayer: () => {},
  startGame: () => {},
  handleNextTurn: () => {},
  setPlayerAnswer: () => {},
  setPlayerChoice: () => {},
});

const FibbageProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addPlayer = (player) => {
    player.score = 0;
    player.answer = null;
    player.choice = null;

    dispatch({ type: actionType.ADD_PLAYER, player });
  };

  const removePlayer = (socketId) => {
    dispatch({ type: actionType.REMOVE_PLAYER, socketId });
  };

  const startGame = () => {
    dispatch({ type: actionType.START_GAME });
    dispatch({ type: actionType.HANDLE_NEXT_TURN });
  };

  const handleNextTurn = () => {
    dispatch({ type: actionType.HANDLE_NEXT_TURN });
  };

  const setPlayerAnswer = (answer, socketId) => {
    dispatch({ type: actionType.SET_PLAYER_ANSWER, answer, socketId });
  };

  const setPlayerChoice = (choice, socketId) => {
    dispatch({ type: actionType.SET_PLAYER_CHOICE, choice, socketId });
  };

  const value = {
    state,
    addPlayer,
    removePlayer,
    startGame,
    handleNextTurn,
    setPlayerAnswer,
    setPlayerChoice,
  };

  return (
    <FibbageContext.Provider value={value}>{children}</FibbageContext.Provider>
  );
};

export default FibbageProvider;
