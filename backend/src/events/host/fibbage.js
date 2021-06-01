const events = (socket, io, getPlayerSockets) => {
  socket.on('host/send/start-answering', ({ prompt }) => {
    const playerSockets = getPlayerSockets();

    playerSockets.forEach((socket) => {
      io.to(socket).emit('client/receive/start-answering', { prompt });
    });
  });

  socket.on('host/send/start-choosing', ({ answers }) => {
    const playerSockets = getPlayerSockets();

    playerSockets.forEach((socket) => {
      io.to(socket).emit('client/receive/start-choosing', { answers });
    });
  });
};

export default events;
