import fibbageHostEvents from './host/fibbage';
import connectFourHostEvents from './host/connectFour';
import fibbageClientEvents from './client/fibbage';
import connectFourClientEvents from './client/connectFour';

import RoomsResolver from '../resolvers/Room';
import { roomTypeEnum } from '../models/Room';

const handleCreate = (socket, io) => {
  socket.on('host/send/create', async ({ socketId, type }) => {
    const room = await RoomsResolver.mutation.createRoom(type, socketId);

    if (!room) {
      socket.emit('host/receive/room-create-error');

      return;
    }

    socket.emit('host/receive/room-create-success', {
      roomCode: room.code,
    });

    let playerSockets = [];

    const getPlayerSockets = () => {
      return playerSockets;
    };

    switch (room.type) {
      case roomTypeEnum.fibbage:
        fibbageHostEvents(socket, io, getPlayerSockets);
        break;
      case roomTypeEnum.connectFour:
        connectFourHostEvents(socket, io, getPlayerSockets);
        break;
      default:
        break;
    }

    socket.on('host/send/player-join', ({ socketId }) => {
      playerSockets.push(socketId);

      if (playerSockets.length === 2) {
        const firstPlayerSocket = playerSockets[0];

        io.to(firstPlayerSocket).emit('client/receive/is-moderator');
      }

      io.to(socketId).emit('client/receive/join-success', {
        roomCode: room.code,
        roomType: type,
      });
    });

    socket.on('host/send/room-full', ({ socketId }) => {
      io.to(socketId).emit('client/receive/join-error', {
        message: 'Room is full',
      });
    });

    socket.on('host/send/game-started', ({ socketId }) => {
      io.to(socketId).emit('client/receive/join-error', {
        message: 'Game already started',
      });
    });

    socket.on('host/send/game-over', (data) => {
      playerSockets.forEach((socket) => {
        io.to(socket).emit('client/receive/game-over', data);
      });
    });

    socket.on('host/send/player-disconnect', ({ socketId }) => {
      const currentModerator = playerSockets[0];

      if (currentModerator.socketId === socketId) {
        const newModerator = playerSockets[1];

        io.to(newModerator).emit('client/receive/is-moderator');
      }

      playerSockets = playerSockets.filter(
        (playerSocketId) => playerSocketId !== socketId
      );
    });

    socket.on('disconnect', async () => {
      playerSockets.forEach((playerSocketId) => {
        io.to(playerSocketId).emit('client/receive/host-disconnect');
      });

      await RoomsResolver.mutation.deleteRoom(socketId);
    });
  });
};

const handleJoin = (socket, io) => {
  socket.on('client/send/join', async ({ roomCode, username, socketId }) => {
    const room = await RoomsResolver.query.room(roomCode);

    if (!room) {
      socket.emit('client/receive/join-error', {
        message: 'Invalid room code',
      });

      return;
    }

    io.to(room.hostId).emit('host/receive/player-join', {
      name: username,
      socketId,
    });

    switch (room.type) {
      case roomTypeEnum.fibbage:
        fibbageClientEvents(socket, io, room.hostId);
        break;
      case roomTypeEnum.connectFour:
        connectFourClientEvents(socket, io, room.hostId);
        break;
      default:
        break;
    }

    socket.on('client/send/start-game', () => {
      io.to(room.hostId).emit('host/receive/start-game');
    });

    socket.on('disconnect', () => {
      io.to(room.hostId).emit('host/receive/player-disconnect', {
        socketId,
      });
    });
  });
};

export default (socket, io) => {
  handleCreate(socket, io);

  handleJoin(socket, io);
};
