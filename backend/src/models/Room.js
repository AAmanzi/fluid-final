import knex from "../database";

export const TABLE_NAME = "rooms";

export const rooms = () => knex.table(TABLE_NAME);

export const ROOM_TYPES = ["FIBBAGE"];

export const initTable = () => {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.increments("id").primary();
    table.string("code").notNullable();
    table.text("type").notNullable();
    table.string("hostId").notNullable();
  });
};

export const reseed = () => {};
