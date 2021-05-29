export const eventName = "fibbage";

const events = (socket, io, hostId) => {
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
