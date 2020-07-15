import React from "react";
import dotenv from "dotenv";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import SocketProvider from "services/socket";

dotenv.config();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <SocketProvider>
        <App />
      </SocketProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
