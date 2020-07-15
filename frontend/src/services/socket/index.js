import React, { useReducer } from "react";
import io from "socket.io-client";
import { apiUrl } from "config.js";

const initialState = {
  socket: io(apiUrl),
};

export const SocketContext = React.createContext({
  state: { ...initialState },
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return { ...state };
  }
};

const SocketProvider = ({ children }) => {
  const [state] = useReducer(reducer, initialState);

  const value = {
    state,
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
