const events = (socket, io, hostId) => {
  socket.on('client/send/drop-coin', ({ columnIndex }) => {
    io.to(hostId).emit('host/receive/drop-coin', { columnIndex });
  });
};

export default events;
