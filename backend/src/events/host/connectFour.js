const events = (socket, io, getPlayerSockets) => {
  socket.on('host/send/player-turn', ({ socketId }) => {
    io.to(socketId).emit('client/receive/player-turn');
  });

  socket.on('host/send/start-game', () => {
    const playerSockets = getPlayerSockets();

    playerSockets.forEach((socket) => {
      io.to(socket).emit('client/receive/start-game');
    });
  });

  socket.on('host/send/update-board', ({ board }) => {
    const playerSockets = getPlayerSockets();

    playerSockets.forEach((socket) => {
      io.to(socket).emit('client/receive/update-board', { board });
    });
  });
};

export default events;
