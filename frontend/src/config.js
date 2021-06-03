import io from 'socket.io-client';

export const dev = process.env.NODE_ENV !== 'production';

const apiUrl = dev ? 'http://localhost:8009' : ''; // TODO: prod url
export const socket = io(apiUrl);

export const playersDevMode = dev && false; // TODO: turn off

export const fibbageMaxPlayers = 8;
