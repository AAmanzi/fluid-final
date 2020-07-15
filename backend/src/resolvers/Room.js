import { rooms, ROOM_TYPES } from "../models/Room";
import { getRandomString } from "../utils/string";

const RoomsResolver = {
  query: {
    room: async (roomCode) => {
      const [room] = await rooms().select("*").where("code", roomCode);

      return room;
    },
  },
  mutation: {
    createRoom: async (type, hostId) => {
      let roomCode = getRandomString(4);

      while (!RoomsResolver.query.room(roomCode)) {
        roomCode = getRandomString(4);
      }

      if (!type || !hostId) {
        return;
      }

      if (!ROOM_TYPES.includes(type)) {
        return;
      }

      const [room] = await rooms()
        .insert({
          code: roomCode,
          type,
          hostId,
        })
        .returning("*");

      return room;
    },
    deleteRoom: async (hostId) => {
      if (!hostId) {
        return;
      }

      await rooms().where("hostId", hostId).del();

      return {
        ok: true,
      };
    },
  },
};

export default RoomsResolver;
