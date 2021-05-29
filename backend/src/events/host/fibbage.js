export const eventName = "fibbage";

const events = (socket, io) => {
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
};

export default events;
