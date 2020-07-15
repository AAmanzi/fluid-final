import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import http from "http";
import socketIo from "socket.io";

import events from "./events";
import { initDatabase } from "./database";

dotenv.config();

initDatabase();

const app = express();
const server = http.createServer(app);
export const io = socketIo(server);

io.on("connection", (socket) => {
  events(socket, io);
});

app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 8009;

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
