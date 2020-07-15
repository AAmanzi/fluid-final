import Knex from "knex";
import { initTables, reseed } from "./tables";

const config = require("../../knexfile.js");

const client = Knex(config);

export default client;

export const initDatabase = async () => {
  await client.migrate.latest();
  return;

  await initTables();
  console.log("Purged DB");
  await reseed();
  console.log("Reseeded data");
};
