import knex from './index';

export const dropTable = (table) =>
  knex.raw(`drop table if exists ${table} cascade`);
