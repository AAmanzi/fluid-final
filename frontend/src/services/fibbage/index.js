import React, { useReducer } from "react";

import { playersDevMode, promptsDevMode } from "config.js";
import devPrompts from "./_prompts.const";
import devPlayers from "./_players.const";

import prodPrompts from "./prompts.const";
import eventTypes from "./eventTypes.const";

let prompts = promptsDevMode ? devPrompts : prodPrompts;

const getRandomPrompt = () => {
  const promptsAmount = prompts.length;
  const promptIndex = Math.floor(Math.random() * promptsAmount);

  const promptToReturn = prompts[promptIndex];

  prompts = prompts.filter(
    (prompt, index) => index !== promptIndex && prompt !== promptToReturn
  );

  return promptToReturn;
};

const initialState = {
  players: playersDevMode ? devPlayers : [],
  displayedPrompt: getRandomPrompt(),
  currentEvent: eventTypes.CHOOSING_ANSWERS,

  gameStart: false,
  gameEnd: false,
};

const reducer = (state = initialState, action) => {
  const prevPlayers = [...state.players];
  const prevEvent = { ...state }.currentEvent;

  switch (action.type) {
    case "ADD_PLAYER":
      if (
        state.players?.some(
          (player) => player.socketId === action.player.socketId
        )
      ) {
        return { ...state };
      }

      return {
        ...state,
        players: [...state.players, action.player],
      };
    case "REMOVE_PLAYER":
      const newPlayersRemove = prevPlayers.filter(
        (player) => player.socketId !== action.socketId
      );
      return {
        ...state,
        players: newPlayersRemove,
      };
    case "START_GAME":
      return {
        ...state,
        gameStart: true,
      };
    case "HANDLE_NEXT_TURN":
      const newEvent =
        prevEvent === eventTypes.CHOOSING_ANSWERS
          ? eventTypes.ANSWERING_PROMPT
          : eventTypes.CHOOSING_ANSWERS;
      const newPlayersNextTurn =
        newEvent === eventTypes.CHOOSING_ANSWERS
          ? prevPlayers
          : prevPlayers.map((player) => ({ ...player, answer: null }));

      return {
        ...state,
        currentEvent: newEvent,
        players: newPlayersNextTurn,
      };
    case "SET_PROMPT":
      return {
        ...state,
        displayedPrompt: action.prompt,
      };
    case "SET_PLAYER_ANSWER":
      const newPlayersAnswer = [...prevPlayers];

      const playerToEdit = newPlayersAnswer.find(
        (player) => player.socketId === action.socketId
      );

      playerToEdit.answer = action.answer;

      return {
        ...state,
        players: newPlayersAnswer,
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
  getNewPrompt: () => {},
  setPlayerAnswer: () => {},
});

const FibbageProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addPlayer = (player) => {
    player.score = 0;
    player.answer = null;

    dispatch({ type: "ADD_PLAYER", player });
  };

  const removePlayer = (socketId) => {
    dispatch({ type: "REMOVE_PLAYER", socketId });
  };

  const startGame = () => {
    dispatch({ type: "START_GAME" });
    dispatch({ type: "HANDLE_NEXT_TURN" });
  };

  const handleNextTurn = () => {
    dispatch({ type: "HANDLE_NEXT_TURN" });
  };

  const getNewPrompt = () => {
    const newPrompt = getRandomPrompt();

    dispatch({ type: "SET_PROMPT", prompt: newPrompt });
  };

  const setPlayerAnswer = (answer, socketId) => {
    dispatch({ type: "SET_PLAYER_ANSWER", answer, socketId });
  };

  const value = {
    state,
    addPlayer,
    removePlayer,
    startGame,
    handleNextTurn,
    getNewPrompt,
    setPlayerAnswer,
  };

  return (
    <FibbageContext.Provider value={value}>{children}</FibbageContext.Provider>
  );
};

export default FibbageProvider;
