const events = (socket, io, hostId) => {
  socket.on('client/send/drop-coin', ({ columnIndex }) => {
    io.hostId(hostId).emit('host/receive/drop-coin', { columnIndex });
  });
};

export default events;
