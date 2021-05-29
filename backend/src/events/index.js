import fibbageHostEvents from "./host/fibbage";
import fibbageClientEvents from "./client/fibbage";
import RoomsResolver from "../resolvers/Room";
import { roomTypeEnum } from "../models/Room";

const handleCreate = (socket, io) => {
  socket.on("host/send/create", async ({ socketId, type }) => {
    const room = await RoomsResolver.mutation.createRoom(type, socketId);

    if (!room) {
      socket.emit("host/receive/room-create-error");

      return;
    }

    socket.emit("host/receive/room-create-success", room.code);

    switch (room.type) {
      case roomTypeEnum.fibbage:
        fibbageHostEvents(socket, io);
        break;
      default:
        break;
    }

    socket.on("disconnect", async () => {
      await RoomsResolver.mutation.deleteRoom(socketId);
    });
  });
};

const handleJoin = (socket, io) => {
  socket.on("client/send/join", async ({ roomCode, username, socketId }) => {
    const room = await RoomsResolver.query.room(roomCode);

    if (!room) {
      socket.emit("client/receive/join-error");

      return;
    }

    socket.emit("client/receive/join-success");

    io.to(room.hostId).emit("host/receive/player-join", {
      name: username,
      socketId,
    });

    switch (room.type) {
      case roomTypeEnum.fibbage:
        fibbageClientEvents(socket, io, room.hostId);
        break;
      default:
        break;
    }

    socket.on("disconnect", () => {
      io.to(room.hostId).emit("host/receive/player-disconnect", { socketId });
    });
  });
};

export default (socket, io) => {
  handleCreate(socket, io);

  handleJoin(socket, io);
};
