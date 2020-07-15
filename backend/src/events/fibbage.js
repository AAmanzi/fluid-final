export const eventName = "fibbage";

const events = (socket, io, hostId) => {
  // -----------------------
  // HOST EVENTS
  // -----------------------

  socket.on("host/send/start-answering", ({ players, prompt }) => {
    console.log("answer", { players, prompt });
    players.forEach((player) => {
      io.to(player.socketId).emit("client/receive/start-answering", { prompt });
    });
  });

  socket.on("host/send/start-choosing", ({ players }) => {
    console.log("choose", players);
    players.forEach((player) => {
      io.to(player.socketId).emit("client/receive/start-choosing");
    });
  });

  // -----------------------
  // CLIENT EVENTS
  // -----------------------

  socket.on("client/send/answer", ({ answer, socketId }) => {
    console.log("answer", { answer, socketId });
    io.to(hostId).emit("host/receive/answer", { answer, socketId });
  });

  socket.on("client/send/choice", ({ choice, socketId }) => {
    console.log("choice", { choice, socketId });
    io.to(hostId).emit("host/receive/choice", { choice, socketId });
  });
};

export default events;
