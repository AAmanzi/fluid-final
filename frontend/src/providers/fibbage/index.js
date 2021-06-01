import React, { useReducer } from 'react';

import { playersDevMode, promptsDevMode } from 'src/config';
import { FIBBAGE_EVENT_TYPE } from 'src/consts/enums';

import devPrompts from './_prompts.const';
import prodPrompts from './prompts.const';
import devPlayers from './_players.const';
import {
  getScoreForCorrectAnswer,
  getScoreForFooling,
  takeNewPrompt,
} from './utils';

const initialPlayers = playersDevMode ? devPlayers : [];
const initialPrompts = promptsDevMode ? devPrompts : prodPrompts;

const initialState = {
  players: initialPlayers,
  prompts: initialPrompts,

  currentPrompt: null,
  currentEvent: null,

  round: 1,
  gameStart: false,
  gameEnd: false,
};

const actionType = Object.freeze({
  ADD_PLAYER: 'ADD_PLAYER',
  REMOVE_PLAYER: 'REMOVE_PLAYER',
  HANDLE_START_GAME: 'HANDLE_START_GAME',
  HANDLE_FINISH_ANSWERING_PROMPT: 'HANDLE_FINISH_ANSWERING_PROMPT',
  HANDLE_FINISH_CHOOSING_ANSWERS: 'HANDLE_FINISH_CHOOSING_ANSWERS',
  HANDLE_FINISH_ROUND: 'HANDLE_FINISH_ROUND',
  SET_PLAYER_ANSWER: 'SET_PLAYER_ANSWER',
  SET_PLAYER_CHOICE: 'SET_PLAYER_CHOICE',
});

const reducer = (state = initialState, action) => {
  const prevPlayers = [...state.players];

  switch (action.type) {
    case actionType.ADD_PLAYER:
      const alreadyExists = state.players?.some(
        (player) => player.socketId === action.player.socketId
      );

      if (alreadyExists) {
        return {
          ...state,
        };
      }

      return {
        ...state,
        players: [...state.players, action.player],
      };
    case actionType.REMOVE_PLAYER:
      const playersAfterRemovePlayer = prevPlayers.filter(
        (player) => player.socketId !== action.socketId
      );

      return {
        ...state,
        players: playersAfterRemovePlayer,
      };
    case actionType.HANDLE_START_GAME:
      const {
        newPrompt: currentPromptAfterStartGame,
        newPrompts: promptsAfterStartGame,
      } = takeNewPrompt(state.prompts);

      return {
        ...state,

        prompts: promptsAfterStartGame,

        currentEvent: FIBBAGE_EVENT_TYPE.answeringPrompt,
        currentPrompt: currentPromptAfterStartGame,

        gameStart: true,
      };
    case actionType.HANDLE_FINISH_ANSWERING_PROMPT:
      return {
        ...state,
        currentEvent: FIBBAGE_EVENT_TYPE.choosingAnswers,
      };
    case actionType.HANDLE_FINISH_CHOOSING_ANSWERS:
      return {
        ...state,
        currentEvent: FIBBAGE_EVENT_TYPE.displayResults,
      };
    case actionType.HANDLE_FINISH_ROUND:
      const playersAfterFinishRound = state.players.map((player) => ({
        ...player,
      }));

      playersAfterFinishRound.forEach((player) => {
        if (player.choice.playerId === 'correct') {
          player.score += getScoreForCorrectAnswer(state.round);
        } else {
          const playerFooledBy = playersAfterFinishRound.find(
            ({ socketId }) => socketId === player.socketId
          );

          playerFooledBy.score += getScoreForFooling(state.round);
        }

        player.choice = null;
        player.answer = null;
      });

      const {
        newPrompt: currentPromptAfterFinishRound,
        newPrompts: promptsAfterFinishRound,
      } = takeNewPrompt(state.prompts);

      return {
        ...state,

        players: playersAfterFinishRound,
        prompts: promptsAfterFinishRound,

        currentEvent: FIBBAGE_EVENT_TYPE.answeringPrompt,
        currentPrompt: currentPromptAfterFinishRound,

        round: state.round + 1,
      };
    case actionType.SET_PLAYER_ANSWER:
      const playersAfterSetAnswer = [...prevPlayers];

      const playerToEditAnswer = playersAfterSetAnswer.find(
        (player) => player.socketId === action.socketId
      );

      playerToEditAnswer.answer = action.answer;

      return {
        ...state,
        players: playersAfterSetAnswer,
      };
    case actionType.SET_PLAYER_CHOICE:
      const playersAfterSetChoice = [...prevPlayers];

      const playerToEditChoice = playersAfterSetChoice.find(
        (player) => player.socketId === action.socketId
      );

      playerToEditChoice.choice = action.choice;

      return {
        ...state,
        players: playersAfterSetChoice,
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
  finishAnsweringPrompt: () => {},
  finishChoosingAnswers: () => {},
  finishRound: () => {},
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
    dispatch({ type: actionType.HANDLE_START_GAME });
  };

  const finishAnsweringPrompt = () => {
    dispatch({ type: actionType.HANDLE_FINISH_ANSWERING_PROMPT });
  };

  const finishChoosingAnswers = () => {
    dispatch({ type: actionType.HANDLE_FINISH_CHOOSING_ANSWERS });
  };

  const finishRound = () => {
    dispatch({ type: actionType.HANDLE_FINISH_ROUND });
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
    finishAnsweringPrompt,
    finishChoosingAnswers,
    finishRound,
    setPlayerAnswer,
    setPlayerChoice,
  };

  return (
    <FibbageContext.Provider value={value}>{children}</FibbageContext.Provider>
  );
};

export default FibbageProvider;
