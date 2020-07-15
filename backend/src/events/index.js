import fibbageEvents from "./fibbage";
import RoomsResolver from "../resolvers/Room";

const handleCreate = (socket, io) => {
  socket.on("create", async ({ socketId, type }) => {
    const room = await RoomsResolver.mutation.createRoom(type, socketId);

    socket.emit("create/success", room && room.code);

    switch (room.type) {
      case "FIBBAGE":
        fibbageEvents(socket, io, socketId);
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
  socket.on("join", async ({ roomCode, username, socketId }) => {
    const room = await RoomsResolver.query.room(roomCode);

    if (!room) {
      socket.emit("join/error");

      return;
    }

    socket.emit("join/success");

    io.to(room.hostId).emit("client/join", { name: username, socketId });

    switch (room.type) {
      case "FIBBAGE":
        fibbageEvents(socket, io, room.hostId);
        break;
      default:
        break;
    }

    socket.on("disconnect", () => {
      io.to(room.hostId).emit("client/disconnect", { socketId });
    });
  });
};

export default (socket, io) => {
  handleCreate(socket, io);

  handleJoin(socket, io);
};
